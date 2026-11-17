require 'rails_helper'

RSpec.describe MlbSyncRosterJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:team) { FactoryBot.create(:team, season: season, abbr: 'NYY') }
  let(:players_data) { { players: [{ name: 'Aaron Judge', abbr: 'judgeaa01', position: 'RF' }] } }

  before { allow(Crawler).to receive(:players).and_return(players_data) }

  it 'creates a player under the team, with name set on a brand new record' do
    expect { described_class.perform_now(2023, 'NYY') }.to change(Player, :count).by(1)
    player = team.players.find_by!(abbr: 'judgeaa01')
    expect(player).to have_attributes(name: 'Aaron Judge', position: 'RF')
  end

  it 'updates an already-existing player instead of duplicating it' do
    FactoryBot.create(:player, season: season, team: team, abbr: 'judgeaa01', name: 'stale')

    expect { described_class.perform_now(2023, 'NYY') }.not_to change(Player, :count)
    expect(team.players.find_by!(abbr: 'judgeaa01').name).to eq('Aaron Judge')
  end
end
