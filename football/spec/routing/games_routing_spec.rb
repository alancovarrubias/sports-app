require 'rails_helper'

RSpec.describe GamesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/seasons/1/games').to route_to('games#index', season_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/games/1').to route_to('games#show', id: '1')
    end
  end
end
