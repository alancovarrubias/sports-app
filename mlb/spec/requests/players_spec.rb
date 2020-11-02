require 'rails_helper'

RSpec.describe 'Players', type: :request do
  describe 'players from team' do
    before do
      @team = FactoryBot.create(:team, :with_players)
      # Build separate team to test for isolation
      FactoryBot.create(:team, :with_players)
    end

    describe 'GET /teams/:team_id/players' do
      it 'retrieves list of players from a team' do
        get team_players_path(@team)
        expect(response).to have_http_status(200)
        expect(data.length).to eq(@team.players.length)
      end
    end

    describe 'GET /players/:id' do
      it 'retrieves specific player' do
        player = @team.players.first
        get player_path(player)
        expect(response).to have_http_status(200)
        expect(data['id']).to eq(player.id.to_s)
      end
    end
  end
end
