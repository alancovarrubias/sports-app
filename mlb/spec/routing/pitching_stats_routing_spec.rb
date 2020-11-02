require 'rails_helper'

RSpec.describe PitchingStatsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/games/1/pitching_stats').to route_to('pitching_stats#index', game_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/pitching_stats/1').to route_to('pitching_stats#show', id: '1')
    end
  end
end
