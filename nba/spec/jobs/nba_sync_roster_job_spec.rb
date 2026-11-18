require 'rails_helper'

RSpec.describe NbaSyncRosterJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let(:players_data) { { players: [{ abbr: 'tatumja01', name: 'Jayson Tatum', position: 'F' }] } }

  before { allow(Crawler).to receive(:players).and_return(players_data) }

  it 'creates a player under the team, with name set on a brand new record' do
    expect { described_class.perform_now(2023, ['BOS']) }.to change(Player, :count).by(1)
    player = team.players.find_by!(abbr: 'tatumja01')
    expect(player).to have_attributes(name: 'Jayson Tatum', position: 'F')
  end

  it "finds an already-existing player instead of duplicating it, without touching its name or position" do
    FactoryBot.create(:player, season: season, team: team, abbr: 'tatumja01', name: 'stale', position: 'C')

    expect { described_class.perform_now(2023, ['BOS']) }.not_to change(Player, :count)
    player = team.players.find_by!(abbr: 'tatumja01')
    expect(player).to have_attributes(name: 'stale', position: 'C')
  end

  it 'chains to the next team instead of the schedule sync when teams remain' do
    FactoryBot.create(:team, season: season, abbr: 'LAL')
    job = described_class.new(2023, %w[BOS LAL])
    job.queue_name = 'backfill'
    job.perform_now

    expect(NbaSyncRosterJob).to have_been_enqueued.on_queue('backfill').with(2023, ['LAL'])
    expect(NbaSyncScheduleJob).not_to have_been_enqueued
  end

  it 'hands off to the schedule sync once the last team has synced' do
    job = described_class.new(2023, ['BOS'])
    job.queue_name = 'backfill'
    job.perform_now

    expect(NbaSyncScheduleJob).to have_been_enqueued.on_queue('backfill').with(2023)
    expect(NbaSyncRosterJob).not_to have_been_enqueued
  end
end
