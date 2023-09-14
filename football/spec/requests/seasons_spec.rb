require 'rails_helper'

RSpec.describe 'Seasons', :focus, type: :request do
  before do
    @season = FactoryBot.create(:season)
  end

  describe 'GET /seasons' do
    it 'retrieves list of seasons' do
      get seasons_path
      expect(response).to have_http_status(200)
      expect(body['data'].length).to eq(1)
      expect(body['data'].first).to eq(build_season_hash(@season))
    end
  end
end
