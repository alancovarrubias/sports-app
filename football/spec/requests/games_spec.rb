require 'rails_helper'

RSpec.describe 'Games', type: :request do
  before do
    @season = FactoryBot.create(:season)
    @game = FactoryBot.create(:game, season: @season)
    @away_full_game_stat = FactoryBot.create(:stat, game: @game, team: @game.away_team, interval: :full_game)
    @home_full_game_stat = FactoryBot.create(:stat, game: @game, team: @game.home_team, interval: :full_game)
  end

  describe 'GET /season/:season_id/games' do
    it 'retrieves list of games' do
      get season_games_path(@season)
      expect(response).to have_http_status(200)
      expect(body['data'].length).to eq(@season.games.length)
    end
  end

  describe 'GET /games/:id' do
    it 'retrieves specific game' do
      get game_path(@game)
      expect(response).to have_http_status(200)
      expect(body['data']).to eq(build_game_hash(@game))
    end
  end
end
