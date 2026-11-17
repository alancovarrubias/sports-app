require 'rails_helper'

RSpec.describe NbaSyncGameStatsJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:home_team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let!(:away_team) { FactoryBot.create(:team, season: season, abbr: 'LAL') }
  let!(:game) { FactoryBot.create(:game, season: season, home_team: home_team, away_team: away_team) }
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

  it "creates a placeholder player when the roster hasn't synced yet" do
    expect { described_class.perform_now(game.id) }.to change(Player, :count).by(2)
    expect(away_team.players.find_by!(abbr: 'jamesle01').name).to eq('jamesle01')
  end

  it 'attaches the stat to the already-existing player instead of creating a duplicate' do
    FactoryBot.create(:player, season: season, team: home_team, abbr: 'tatumja01', name: 'Jayson Tatum')

    expect { described_class.perform_now(game.id) }.to change(Player, :count).by(1)
    stat = Stat.find_by!(model: home_team.players.find_by!(abbr: 'tatumja01'))
    expect(stat.pts).to eq(30)
  end
end
