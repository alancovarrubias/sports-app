require 'rails_helper'

RSpec.describe GamesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/seasons/1/games').to route_to('games#index', season_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/games/1').to route_to('games#show', id: '1')
    end

    it 'routes to #away_team' do
      expect(get: '/games/1/away_team').to route_to('games#away_team', id: '1')
    end

    it 'routes to #home_team' do
      expect(get: '/games/1/home_team').to route_to('games#home_team', id: '1')
    end

    it 'routes to #away_players' do
      expect(get: '/games/1/away_players').to route_to('games#away_players', id: '1')
    end

    it 'routes to #home_players' do
      expect(get: '/games/1/home_players').to route_to('games#home_players', id: '1')
    end

    it 'routes to #games' do
      expect(get: '/games').to route_to('games#index')
    end
  end
end
