require 'rails_helper'

RSpec.describe StatsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/games/1/stats').to route_to('stats#index', game_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/stats/1').to route_to('stats#show', id: '1')
    end
  end
end
