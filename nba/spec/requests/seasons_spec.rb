require 'rails_helper'

RSpec.describe 'Seasons', type: :request do
  before do
    @season = FactoryBot.create(:season)
  end

  describe 'GET /seasons' do
    it 'retrieves list of seasons' do
      get seasons_path
      expect(response).to have_http_status(200)
      expect(data.length).to eq(1)
    end
  end

  describe 'GET /seasons/:id' do
    it 'retrieves specific season' do
      get season_path(@season)
      expect(response).to have_http_status(200)
      expect(data['id']).to eq(@season.id.to_s)
    end
  end
end
