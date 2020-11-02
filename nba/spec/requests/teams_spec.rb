require 'rails_helper'

RSpec.describe 'Teams', type: :request do
  before do
    @season = FactoryBot.create(:season, :with_teams)
    # Build separate season to test for isolation
    FactoryBot.create(:season, :with_teams)
  end

  describe 'GET /seasons/:season_id/teams' do
    it 'retrieves list of teams from a season' do
      get season_teams_path(@season)
      expect(response).to have_http_status(200)
      expect(data.length).to eq(@season.teams.length)
    end
  end

  describe 'GET /teams/:id' do
    it 'retrieves specific team' do
      team = @season.teams.first
      get team_path(team)
      expect(response).to have_http_status(200)
      expect(data['id']).to eq(team.id.to_s)
    end
  end
end
