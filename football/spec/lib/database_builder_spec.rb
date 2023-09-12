require 'rails_helper'

RSpec.describe DatabaseBuilder do
  subject { DatabaseBuilder.new }
  let(:game_id) { '401547658' }
  let(:games_response) { { 'espn_game_ids' => [game_id] } }
  let(:away_team_name) { 'Houston Texans' }
  let(:home_team_name) { 'New Orleans Saints' }
  let(:game_clock) { 'Final' }
  let(:game_response) do
    {
      'game' => {
        'start_time' => '12:00 AM, August 28, 2023',
        'game_clock' => game_clock,
        'away_team' => {
          'name' => away_team_name,
          'comp_att' => '15/27',
          'passing_yards' => '104',
          'carries' => '31',
          'rushing_yards' => '131'
        },
        'home_team' => {
          'name' => home_team_name,
          'comp_att' => '28/54',
          'passing_yards' => '257',
          'carries' => '21',
          'rushing_yards' => '91'
        }
      }
    }
  end

  before do
    @season = FactoryBot.create(:season, year: 2023)
    stub_request(:get, 'http://crawler:5000/api/games?year=2023&week=1')
      .to_return(status: 200, body: games_response.to_json)
    stub_request(:get, "http://crawler:5000/api/games/#{game_id}")
      .to_return(status: 200, body: game_response.to_json)
    subject.run
  end

  describe 'game' do
    before do
      @game = @season.games.find_by_espn_id(game_id)
    end
    it { expect(@game.start_time).to eq(DateTime.new(2023, 8, 28, 0, 0, 0)) }
    it { expect(@game.game_clock).to eq(game_clock) }

    describe 'teams' do
      it { expect(@game.away_team.name).to eq(away_team_name) }
      it { expect(@game.home_team.name).to eq(home_team_name) }
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
    end
  end
end
