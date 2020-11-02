require 'rails_helper'

RSpec.describe 'Stats', type: :request do
  before do
    @game = FactoryBot.create(:game, :complete)
    # Build separate game to test for isolation
    FactoryBot.create(:game, :complete)
  end

  describe 'GET /games/:game_id/stats' do
    it 'retrieves list of stats from a game' do
      get game_stats_path(@game)
      expect(response).to have_http_status(200)
      expect(data.length).to eq(@game.stats.length)
    end
  end

  describe 'GET /stats/:id' do
    it 'retrieves specific stat' do
      stat = @game.stats.first
      get stat_path(stat)
      expect(response).to have_http_status(200)
      expect(data['id']).to eq(stat.id.to_s)
    end
  end
end
