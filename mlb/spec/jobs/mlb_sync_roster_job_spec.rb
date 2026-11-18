require 'rails_helper'

RSpec.describe MlbSyncRosterJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:team) { FactoryBot.create(:team, season: season, abbr: 'NYY') }
  let(:players_data) { { players: [{ name: 'Aaron Judge', abbr: 'judgeaa01', position: 'RF' }] } }

  before { allow(Crawler).to receive(:players).and_return(players_data) }

  it 'creates a player under the team, with name set on a brand new record' do
    expect { described_class.perform_now(2023, ['NYY']) }.to change(Player, :count).by(1)
    player = team.players.find_by!(abbr: 'judgeaa01')
    expect(player).to have_attributes(name: 'Aaron Judge', position: 'RF')
  end

  it "finds an already-existing player instead of duplicating it, without touching its name, but refreshes position" do
    FactoryBot.create(:player, season: season, team: team, abbr: 'judgeaa01', name: 'stale', position: '1B')

    expect { described_class.perform_now(2023, ['NYY']) }.not_to change(Player, :count)
    player = team.players.find_by!(abbr: 'judgeaa01')
    expect(player).to have_attributes(name: 'stale', position: 'RF')
  end

  it 'chains to the next team instead of the schedule fan-out when teams remain' do
    FactoryBot.create(:team, season: season, abbr: 'BOS')
    job = described_class.new(2023, %w[NYY BOS])
    job.queue_name = 'backfill'
    job.perform_now

    expect(MlbSyncRosterJob).to have_been_enqueued.on_queue('backfill').with(2023, ['BOS'])
    expect(MlbSyncScheduleJob).not_to have_been_enqueued
  end

  it 'fans out a schedule sync for every team in the season, not just the ones in its own chain' do
    FactoryBot.create(:team, season: season, abbr: 'BOS')
    job = described_class.new(2023, ['NYY'])
    job.queue_name = 'backfill'
    job.perform_now

    expect(MlbSyncScheduleJob).to have_been_enqueued.on_queue('backfill').with(2023, 'NYY')
    expect(MlbSyncScheduleJob).to have_been_enqueued.on_queue('backfill').with(2023, 'BOS')
    expect(MlbSyncRosterJob).not_to have_been_enqueued
  end
end
