require 'rails_helper'

RSpec.describe SeasonsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/seasons').to route_to('seasons#index')
    end
  end
end
