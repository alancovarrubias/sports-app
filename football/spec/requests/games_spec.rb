require 'rails_helper'

RSpec.describe 'Games', type: :request do
  before do
    @season = FactoryBot.create(:season, :with_games)
    FactoryBot.create(:season, :with_games)
  end

  describe 'GET /season/:season_id/games' do
    it 'retrieves list of games' do
      get season_games_path(@season)
      expect(response).to have_http_status(200)
      expect(body['data'].length).to eq(@season.games.length)
      expect(body['data'].first).to eq(build_game_hash(@season.games.first))
    end
  end

  describe 'GET /games/:id' do
    it 'retrieves specific game' do
      game = @season.games.first
      get game_path(game)
      expect(response).to have_http_status(200)
      expect(body['data']).to eq(build_game_hash(game))
    end
  end
end
