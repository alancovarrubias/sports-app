require 'rails_helper'

RSpec.describe 'Games', type: :request do
  before do
    @season = FactoryBot.create(:season, :with_games)
    FactoryBot.create(:season, :with_games)
  end

  describe 'GET /season/:season_id/games' do
    it 'retrieves list of seasons' do
      get season_games_path(@season)
      expect(response).to have_http_status(200)
      expect(data.length).to eq(@season.games.length)
    end
  end

  describe 'GET /games/:id' do
    it 'retrieves specific season' do
      game = @season.games.first
      get game_path(game)
      expect(response).to have_http_status(200)
      expect(data['id']).to eq(game.id.to_s)
    end
  end
end
