require 'rails_helper'

RSpec.describe MlbSyncScheduleJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:home_team) { FactoryBot.create(:team, season: season, abbr: 'NYY') }
  let!(:away_team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  # GamesScraper scrapes one team's full-season schedule but only returns
  # that team's home games, so `team_link` here belongs to the home team.
  let(:games_data) { { games: [{ date: '2023-04-01', home_team: 'NYY', away_team: 'BOS', num: 0 }], team_link: 'NYY' } }

  before { allow(Crawler).to receive(:games).and_return(games_data) }

  it "updates the queried team's link and creates a game with both teams set" do
    expect { described_class.perform_now(2023, 'NYY') }.to change(Game, :count).by(1)
    expect(home_team.reload.link).to eq('NYY')
    game = Game.last
    expect(game).to have_attributes(date: Date.new(2023, 4, 1), num: 0, home_team: home_team, away_team: away_team)
  end

  it 'finds an already-existing game by (season, date, home_team, num) instead of duplicating it' do
    FactoryBot.create(:game, season: season, date: Date.new(2023, 4, 1), home_team: home_team, away_team: away_team, num: 0)

    expect { described_class.perform_now(2023, 'NYY') }.not_to change(Game, :count)
  end

  it 'enqueues a stats sync for the game, on the same queue as itself' do
    job = described_class.new(2023, 'NYY')
    job.queue_name = 'backfill'
    job.perform_now

    expect(MlbSyncGameStatsJob).to have_been_enqueued.on_queue('backfill').with(Game.last.id)
  end
end
