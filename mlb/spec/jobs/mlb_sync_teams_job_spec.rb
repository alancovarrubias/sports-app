require 'rails_helper'

RSpec.describe MlbSyncTeamsJob, type: :job do
  let(:teams_data) do
    {
      teams: [
        { abbr: 'NYY', name: 'Yankees', city: 'New York' },
        { abbr: 'BOS', name: 'Red Sox', city: 'Boston' }
      ]
    }
  end

  before { allow(Crawler).to receive(:teams).and_return(teams_data) }

  it 'creates a team per crawler result, with its timezone looked up by abbr' do
    expect { described_class.perform_now(2023) }.to change(Team, :count).by(2)
    team = Team.find_by!(abbr: 'NYY')
    expect(team).to have_attributes(name: 'Yankees', city: 'New York', timezone: 'Eastern Time (US & Canada)')
  end

  it 'updates an already-existing team instead of duplicating it' do
    allow(Crawler).to receive(:teams).and_return(teams: [{ abbr: 'NYY', name: 'Yankees', city: 'New York' }])
    season = FactoryBot.create(:season, year: 2023)
    FactoryBot.create(:team, season: season, abbr: 'NYY', name: 'stale')

    expect { described_class.perform_now(2023) }.not_to change(Team, :count)
    expect(Team.find_by!(abbr: 'NYY').name).to eq('Yankees')
  end

  it 'enqueues a roster sync and a schedule sync per team, on the same queue as itself' do
    job = described_class.new(2023)
    job.queue_name = 'backfill'
    job.perform_now

    expect(MlbSyncRosterJob).to have_been_enqueued.on_queue('backfill').with(2023, 'NYY')
    expect(MlbSyncScheduleJob).to have_been_enqueued.on_queue('backfill').with(2023, 'NYY')
    expect(MlbSyncRosterJob).to have_been_enqueued.on_queue('backfill').with(2023, 'BOS')
    expect(MlbSyncScheduleJob).to have_been_enqueued.on_queue('backfill').with(2023, 'BOS')
  end
end
