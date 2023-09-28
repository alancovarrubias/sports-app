require 'rails_helper'

RSpec.shared_examples 'Team attributes' do |method|
  it "#{method} should be accurate" do
    team = @game.send(method)
    expect(team.name).to eq(team_data['name'])
    expect(team.abbr).to eq(team_data['abbr'])
  end
end
RSpec.shared_examples 'Stat attributes' do |method|
  it "#{method} should be accurate" do
    stat = @game.send(method)
    expect(stat.completions).to eq(team_data['comp_att'].split('/')[0].to_i)
    expect(stat.attempts).to eq(team_data['comp_att'].split('/')[1].to_i)
    expect(stat.passing_yards).to eq(team_data['passing_yards'].to_i)
    expect(stat.carries).to eq(team_data['carries'].to_i)
    expect(stat.rushing_yards).to eq(team_data['rushing_yards'].to_i)
    expect(stat.longest_rush).to eq(team_data['longest_rush'].to_i)
    expect(stat.longest_pass).to eq(team_data['longest_pass'].to_i)
    expect(stat.score).to eq(team_data['score'].to_i)
  end
end

RSpec.describe DatabaseSeed::Runner, :focus do
  subject { DatabaseSeed::Runner.new(league) }
  let(:league) { :nfl }

  let(:url_builder) { DatabaseSeed::UrlBuilder.new(league) }
  let(:schedule_url) { url_builder.schedule(options) }
  let(:boxscore_url) { url_builder.boxscore(espn_id) }
  let(:playbyplay_url) { url_builder.playbyplay(espn_id) }

  let(:schedule_data) { fetch_file('schedule_data.json') }
  let(:boxscore_data) { fetch_file('boxscore_data.json') }
  let(:not_started_boxscore_data) { fetch_file('not_started_boxscore_data.json') }
  let(:halftime_boxscore_data) { fetch_file('halftime_boxscore_data.json') }
  let(:away_team_data) { boxscore_data['away_team'] }
  let(:home_team_data) { boxscore_data['home_team'] }
  let(:playbyplay_data) { fetch_file('playbyplay_data.json') }

  let(:year) { schedule_data['year'].to_i }
  let(:week) { schedule_data['week'].to_i }
  let(:options) { { week: week, year: year } }
  let(:espn_id) { schedule_data['espn_ids'][0].to_i }
  let(:start_time) { DateTime.parse(boxscore_data['start_time']) }
  let(:game_clock) { boxscore_data['game_clock'] }
  let(:date) { start_time.in_time_zone('Pacific Time (US & Canada)').to_date }
  let(:kicked) { 'away' }

  def stub_url(url, response)
    stub_request(:get, url).to_return(status: 200, body: response.to_json)
  end

  def fetch_file(filename)
    path = Rails.root.join('spec', 'fixtures', filename)
    JSON.parse(File.read(path))
  end

  def create_game(game_clock, kicked = nil)
    season = FactoryBot.create(:season, year: year, league: league)
    FactoryBot.create(:game, espn_id: espn_id, season: season, start_time: start_time, game_clock: game_clock,
                             kicked: kicked)
  end

  before do
    stub_url(schedule_url, schedule_data)
    stub_url(boxscore_url, boxscore_data)
    stub_url(playbyplay_url, playbyplay_data)
  end

  describe 'urls called' do
    it 'with options' do
      subject.run(options)
      expect(a_request(:get, schedule_url)).to have_been_made
      expect(a_request(:get, boxscore_url)).to have_been_made
    end

    it 'without options' do
      stub_url(url_builder.schedule, schedule_data)
      subject.run
      expect(a_request(:get, url_builder.schedule)).to have_been_made
    end

    it 'current time before game start time' do
      allow(DateTime).to receive(:now).and_return(start_time - 1.second)
      create_game('Not Started')
      subject.run(options)
      expect(a_request(:get, boxscore_url)).not_to have_been_made
      expect(a_request(:get, playbyplay_url)).not_to have_been_made
    end

    it 'current time equal to start time' do
      allow(DateTime).to receive(:now).and_return(start_time)
      create_game('Not Started')
      subject.run(options)
      expect(a_request(:get, boxscore_url)).to have_been_made
      expect(a_request(:get, playbyplay_url)).to have_been_made
    end
    it 'game with game clock Final exists' do
      create_game('Final')
      subject.run(options)
      expect(a_request(:get, boxscore_url)).not_to have_been_made
      expect(a_request(:get, playbyplay_url)).not_to have_been_made
    end
    it 'Not Started game clock response' do
      stub_url(url_builder.boxscore(espn_id), not_started_boxscore_data)
      subject.run(options)
      expect(a_request(:get, boxscore_url)).to have_been_made
      expect(a_request(:get, playbyplay_url)).not_to have_been_made
    end
    it 'game with kicked exists' do
      create_game('Not Started', kicked)
      subject.run(options)
      expect(a_request(:get, playbyplay_url)).not_to have_been_made
    end
  end

  describe 'default route' do
    before do
      subject.run(options)
      @game = Game.find_by_espn_id(espn_id)
    end

    describe 'season' do
      it 'should be accurate' do
        expect(@game.season.year).to eq(year)
      end
    end

    describe 'game' do
      it 'should be accurate' do
        expect(@game.week).to eq(week)
        expect(@game.game_clock).to eq(game_clock)
        expect(@game.date).to eq(date)
        expect(@game.espn_id).to eq(espn_id)
        expect(@game.kicked).to eq(kicked)
        expect(@game.start_time).to eq(start_time)
      end
    end

    describe 'away_team' do
      include_examples 'Team attributes', :away_team do
        let(:team_data) { away_team_data }
      end
    end

    describe 'home_team' do
      include_examples 'Team attributes', :home_team do
        let(:team_data) { home_team_data }
      end
    end

    describe 'away_full_game_stat' do
      include_examples 'Stat attributes', :away_full_game_stat do
        let(:team_data) { away_team_data }
      end
    end

    describe 'home_full_game_stat' do
      include_examples 'Stat attributes', :home_full_game_stat do
        let(:team_data) { home_team_data }
      end
    end

    describe 'first_half_stats' do
      it 'should not exist' do
        expect(@game.away_first_half_stat).to be_nil
        expect(@game.home_first_half_stat).to be_nil
      end
    end
  end

  describe 'Halftime boxscore' do
    before do
      stub_url(boxscore_url, halftime_boxscore_data)
      subject.run(options)
      @game = Game.find_by_espn_id(espn_id)
    end

    describe 'away_first_half_stat' do
      include_examples 'Stat attributes', :away_first_half_stat do
        let(:team_data) { away_team_data }
      end
    end

    describe 'home_first_half_stat' do
      include_examples 'Stat attributes', :home_first_half_stat do
        let(:team_data) { home_team_data }
      end
    end
  end
end
