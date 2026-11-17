require 'rails_helper'

RSpec.describe NbaSyncGameStatsJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:home_team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let!(:away_team) { FactoryBot.create(:team, season: season, abbr: 'LAL') }
  let!(:game) { FactoryBot.create(:game, season: season, home_team: home_team, away_team: away_team) }
  let!(:away_player) { FactoryBot.create(:player, season: season, team: away_team, abbr: 'jamesle01', name: 'LeBron James') }
  let!(:home_player) { FactoryBot.create(:player, season: season, team: home_team, abbr: 'tatumja01', name: 'Jayson Tatum') }
  let(:stats_data) do
    {
      away_team_stats: [{ pts: 105 }],
      home_team_stats: [{ pts: 110 }],
      away_player_stats: [{ abbr: 'jamesle01', pts: 26 }],
      home_player_stats: [{ abbr: 'tatumja01', pts: 30 }]
    }
  end

  before { allow(Crawler).to receive(:stats).and_return(stats_data) }

  it 'persists a stat for each team and each player row returned' do
    expect { described_class.perform_now(game.id) }.to change(Stat, :count).by(4)
  end

  it 'attaches the stat to the already-synced player' do
    described_class.perform_now(game.id)

    stat = Stat.find_by!(model: home_player)
    expect(stat.pts).to eq(30)
  end

  it "raises if the roster hasn't synced yet instead of silently creating a player" do
    away_player.destroy!

    expect { described_class.perform_now(game.id) }.to raise_error(ActiveRecord::RecordNotFound)
  end
end
