require 'rails_helper'

RSpec.describe PlayersController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/teams/1/players').to route_to('players#index', team_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/players/1').to route_to('players#show', id: '1')
    end
  end
end
