require 'rails_helper'

RSpec.describe DatabaseBuilder do
  subject { DatabaseBuilder.new }
  let(:league) { 'nfl' }
  let(:year) { 2023 }
  let(:week) { 1 }
  let(:games_url) { DatabaseBuilder::GAMES_URL }
  let(:options) { { week: week, year: year } }
  let(:query_params) { "week=#{week}&year=#{year}" }
  let(:game_id) { '401547658' }
  let(:start_time) { DateTime.new(2023, 8, 28, 0, 0, 0) }
  let(:date) { start_time.in_time_zone('Pacific Time (US & Canada)').to_date }
  let(:games_response) { { 'year' => year.to_s, 'week' => week.to_s, 'espn_game_ids' => [game_id] } }
  let(:away_team_name) { 'Houston Texans' }
  let(:home_team_name) { 'New Orleans Saints' }
  let(:away_team_abbr) { 'HOU' }
  let(:home_team_abbr) { 'NO' }
  let(:game_clock) { 'Final' }
  let(:game_response) do
    {
      'game' => {
        'start_time' => '12:00 AM, August 28, 2023',
        'game_clock' => game_clock,
        'away_team' => {
          'name' => away_team_name,
          'abbr' => away_team_abbr,
          'score' => '17',
          'comp_att' => '15/27',
          'passing_yards' => '104',
          'carries' => '31',
          'rushing_yards' => '131',
          'longest_rush' => '21',
          'longest_pass' => '26'
        },
        'home_team' => {
          'name' => home_team_name,
          'abbr' => home_team_abbr,
          'score' => '13',
          'comp_att' => '28/54',
          'passing_yards' => '257',
          'carries' => '21',
          'rushing_yards' => '91',
          'longest_rush' => '26',
          'longest_pass' => '53'
        }
      }
    }
  end
  let(:playbyplay_response) do
    {
      'game' => {
        'received' => 'New Orleans Saints'
      }
    }
  end
  before do
    stub_request(:get, "#{games_url}?#{query_params}&league=#{league}")
      .to_return(status: 200, body: games_response.to_json)
    stub_request(:get, "#{games_url}?league=#{league}")
      .to_return(status: 200, body: games_response.to_json)
    stub_request(:get, "#{games_url}/#{game_id}?league=#{league}")
      .to_return(status: 200, body: game_response.to_json)
    stub_request(:get, "#{games_url}/#{game_id}/playbyplay?league=#{league}")
      .to_return(status: 200, body: playbyplay_response.to_json)
  end

  describe 'urls' do
    it 'with options queries games URL with query params' do
      subject.run(league, options)
      expect(a_request(:get, "#{games_url}?#{query_params}&league=#{league}")).to have_been_made.once
    end

    it 'without options queries games URL without query params' do
      subject.run(league)
      expect(a_request(:get, "#{games_url}?league=#{league}")).to have_been_made.once
    end
  end

  describe 'game attributes' do
    before do
      subject.run(league, options)
      @game = Game.find_by_espn_id(game_id)
    end
    it 'should be accurate' do
      expect(@game.season.year).to eq(year)
      expect(@game.week).to eq(week)
      expect(@game.date).to eq(date)
      expect(@game.kicked).to eq('away')
      expect(@game.start_time).to eq(start_time)
      expect(@game.game_clock).to eq(game_clock)
    end

    describe 'teams' do
      it { expect(@game.away_team.name).to eq(away_team_name) }
      it { expect(@game.home_team.name).to eq(home_team_name) }
      it { expect(@game.away_team.abbr).to eq(away_team_abbr) }
      it { expect(@game.home_team.abbr).to eq(home_team_abbr) }
    end

    describe 'away_full_game_stat' do
      before do
        @away_stat = @game.away_full_game_stat
      end
      it { expect(@away_stat.completions).to eq(15) }
      it { expect(@away_stat.attempts).to eq(27) }
      it { expect(@away_stat.passing_yards).to eq(104) }
      it { expect(@away_stat.carries).to eq(31) }
      it { expect(@away_stat.rushing_yards).to eq(131) }
      it { expect(@away_stat.longest_rush).to eq(21) }
      it { expect(@away_stat.longest_pass).to eq(26) }
      it { expect(@away_stat.score).to eq(17) }
    end

    describe 'home_full_game_stat' do
      before do
        @home_stat = @game.home_full_game_stat
      end
      it { expect(@home_stat.completions).to eq(28) }
      it { expect(@home_stat.attempts).to eq(54) }
      it { expect(@home_stat.passing_yards).to eq(257) }
      it { expect(@home_stat.carries).to eq(21) }
      it { expect(@home_stat.rushing_yards).to eq(91) }
      it { expect(@home_stat.longest_rush).to eq(26) }
      it { expect(@home_stat.score).to eq(13) }
    end
  end
end
