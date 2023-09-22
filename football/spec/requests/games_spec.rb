require 'rails_helper'

RSpec.describe 'Games', type: :request do
  before do
    @game = FactoryBot.create(:game)
    @away_full_game_stat = FactoryBot.create(:stat, game: @game, team: @game.away_team, interval: :full_game)
    @home_full_game_stat = FactoryBot.create(:stat, game: @game, team: @game.home_team, interval: :full_game)
  end

  describe 'GET /games' do
    it 'retrieves list of games' do
      get games_path
      expect(response).to have_http_status(200)
      expect(body['data'].length).to eq(Game.all.length)
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
