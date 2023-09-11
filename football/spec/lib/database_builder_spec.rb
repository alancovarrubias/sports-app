require 'rails_helper'

RSpec.describe DatabaseBuilder do
  subject { DatabaseBuilder.new }
  let(:game_id) { '401547658' }
  let(:games_response) { { 'espn_game_ids' => [game_id] } }
  let(:game_response) do
    {
      'game' => {
        'start_time' => '12:00 AM, August 28, 2023',
        'game_clock' => 'Final',
        'away_team' => {
          'name' => 'Houston Texans',
          'comp_att' => '15/27',
          'passing_yards' => '104',
          'carries' => '31',
          'rushing_yards' => '131'
        },
        'home_team' => {
          'name' => 'New Orleans Saints',
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
  end

  it 'creates away team' do
    subject.run
    away_team = @season.teams.find_by_name('Houston Texans')
    home_team = @season.teams.find_by_name('New Orleans Saints')
    game = @season.games.find_by_espn_id(game_id)
    expect(away_team).to be_truthy
    expect(home_team).to be_truthy
    expect(game).to be_truthy
    expect(game.start_time).to eq(DateTime.new(2023, 8, 28, 0, 0, 0))
    expect(game.game_clock).to eq('Final')
  end
end
