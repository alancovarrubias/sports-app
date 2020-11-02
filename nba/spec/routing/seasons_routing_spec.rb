require 'rails_helper'

RSpec.describe SeasonsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/seasons').to route_to('seasons#index')
    end

    it 'routes to #show' do
      expect(get: '/seasons/1').to route_to('seasons#show', id: '1')
    end
  end
end
