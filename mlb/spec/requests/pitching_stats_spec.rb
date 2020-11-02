require 'rails_helper'

RSpec.describe 'PitchingStats', type: :request do
  before do
    @game = FactoryBot.create(:game, :with_stats)
    # Build separate game to test for isolation
    FactoryBot.create(:game, :with_stats)
  end

  describe 'GET /games/:game_id/pitching_stats' do
    it 'retrieves list of stats from a game' do
      get game_pitching_stats_path(@game)
      expect(response).to have_http_status(200)
      expect(data.length).to eq(@game.pitching_stats.length)
    end
  end

  describe 'GET /pitching_stats/:id' do
    it 'retrieves specific stat' do
      stat = @game.pitching_stats.first
      get pitching_stat_path(stat)
      expect(response).to have_http_status(200)
      expect(data['id']).to eq(stat.id.to_s)
    end
  end
end
