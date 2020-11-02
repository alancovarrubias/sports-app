require 'rails_helper'

RSpec.describe TeamsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/seasons/1/teams').to route_to('teams#index', season_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/teams/1').to route_to('teams#show', id: '1')
    end
  end
end
