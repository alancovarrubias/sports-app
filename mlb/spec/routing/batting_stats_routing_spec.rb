require 'rails_helper'

RSpec.describe BattingStatsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/games/1/batting_stats').to route_to('batting_stats#index', game_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/batting_stats/1').to route_to('batting_stats#show', id: '1')
    end
  end
end
