require 'rails_helper'

RSpec.describe NbaSyncScheduleJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:home_team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let!(:away_team) { FactoryBot.create(:team, season: season, abbr: 'LAL') }
  # basketball-reference's sortable `csk` date, already stripped by the
  # crawler down to an 8-digit YYYYMMDD string.
  let(:games_data) { { games: [{ date: '20230115', away_team: 'LAL', home_team: 'BOS' }] } }

  before { allow(Crawler).to receive(:games).and_return(games_data) }

  it 'creates a game with both teams set on a brand new record' do
    expect { described_class.perform_now(2023) }.to change(Game, :count).by(1)
    game = Game.last
    expect(game).to have_attributes(date: Date.new(2023, 1, 15), home_team: home_team, away_team: away_team)
  end

  it 'finds an already-existing game by (season, date, home_team) instead of duplicating it' do
    FactoryBot.create(:game, season: season, date: Date.new(2023, 1, 15), home_team: home_team, away_team: away_team)

    expect { described_class.perform_now(2023) }.not_to change(Game, :count)
  end

  it 'enqueues a stats sync for the game, on the same queue as itself' do
    job = described_class.new(2023)
    job.queue_name = 'backfill'
    job.perform_now

    expect(NbaSyncGameStatsJob).to have_been_enqueued.on_queue('backfill').with(Game.last.id)
  end
end
