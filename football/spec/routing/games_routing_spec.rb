require 'rails_helper'

RSpec.describe GamesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/games').to route_to('games#index')
    end

    it 'routes to #show' do
      expect(get: '/games/1').to route_to('games#show', id: '1')
    end
  end
end
