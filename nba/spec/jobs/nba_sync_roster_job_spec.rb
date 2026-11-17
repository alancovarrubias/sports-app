require 'rails_helper'

RSpec.describe NbaSyncRosterJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let(:players_data) { { players: [{ abbr: 'tatumja01', name: 'Jayson Tatum', position: 'F' }] } }

  before { allow(Crawler).to receive(:players).and_return(players_data) }

  it 'creates a player under the team, with name set on a brand new record' do
    expect { described_class.perform_now(2023, 'BOS') }.to change(Player, :count).by(1)
    player = team.players.find_by!(abbr: 'tatumja01')
    expect(player).to have_attributes(name: 'Jayson Tatum', position: 'F')
  end

  it 'updates an already-existing player instead of duplicating it' do
    FactoryBot.create(:player, season: season, team: team, abbr: 'tatumja01', name: 'stale')

    expect { described_class.perform_now(2023, 'BOS') }.not_to change(Player, :count)
    expect(team.players.find_by!(abbr: 'tatumja01').name).to eq('Jayson Tatum')
  end
end
