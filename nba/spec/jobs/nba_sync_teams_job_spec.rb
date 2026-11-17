require 'rails_helper'

RSpec.describe NbaSyncTeamsJob, type: :job do
  let(:teams_data) do
    {
      teams: [
        { abbr: 'BOS', name: 'Celtics', city: 'Boston' },
        { abbr: 'LAL', name: 'Lakers', city: 'Los Angeles' }
      ]
    }
  end

  before { allow(Crawler).to receive(:teams).and_return(teams_data) }

  it 'creates a team per crawler result, with name/city set on a brand new record' do
    expect { described_class.perform_now(2023) }.to change(Team, :count).by(2)
    team = Team.find_by!(abbr: 'BOS')
    expect(team).to have_attributes(name: 'Celtics', city: 'Boston')
  end

  it 'finds the season by year instead of duplicating it on re-run' do
    expect { described_class.perform_now(2023) }.to change(Season, :count).by(1)
    expect { described_class.perform_now(2023) }.not_to change(Season, :count)
  end

  it 'updates an already-existing team instead of duplicating it' do
    allow(Crawler).to receive(:teams).and_return(teams: [{ abbr: 'BOS', name: 'Celtics', city: 'Boston' }])
    season = FactoryBot.create(:season, year: 2023)
    FactoryBot.create(:team, season: season, abbr: 'BOS', name: 'stale', city: 'stale')

    expect { described_class.perform_now(2023) }.not_to change(Team, :count)
    expect(Team.find_by!(abbr: 'BOS').name).to eq('Celtics')
  end

  it 'enqueues a single roster sync carrying every team, on the same queue as itself' do
    job = described_class.new(2023)
    job.queue_name = 'backfill'
    job.perform_now

    expect(NbaSyncRosterJob).to have_been_enqueued.on_queue('backfill').with(2023, %w[BOS LAL])
  end
end
