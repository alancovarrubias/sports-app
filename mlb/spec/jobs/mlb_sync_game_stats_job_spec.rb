require 'rails_helper'

RSpec.describe MlbSyncGameStatsJob, type: :job do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:home_team) { FactoryBot.create(:team, season: season, abbr: 'NYY') }
  let!(:away_team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let!(:game) { FactoryBot.create(:game, season: season, home_team: home_team, away_team: away_team, num: 0) }
  let!(:home_player) { FactoryBot.create(:player, season: season, team: home_team, abbr: 'judgeaa01', name: 'Aaron Judge', position: 'RF') }
  let!(:away_player) { FactoryBot.create(:player, season: season, team: away_team, abbr: 'deversra01', name: 'Rafael Devers') }
  let(:plays) do
    [
      { rob: '', pitch_count: '3', run_out: '', at_bat: 'NYY', batter: 'Aaron Judge', pitcher: 'Chris Sale', text: 'Fly Ball' },
      { rob: '', pitch_count: '2', run_out: '', at_bat: 'BOS', batter: 'Rafael Devers', pitcher: 'Gerrit Cole', text: 'Ground Ball' }
    ]
  end
  let(:stats_data) do
    {
      plays: plays,
      away_player_stats: [{ stat_type: 'Batting', name: 'Rafael Devers', abbr: 'deversra01', h: 2 }],
      home_player_stats: [{ stat_type: 'Batting', name: 'Aaron Judge', abbr: 'judgeaa01', position: 'DH', h: 3 }],
      away_team_stats: [
        { stat_type: 'Batting', h: 8 },
        { stat_type: 'Pitching', ip: 9.0 }
      ],
      home_team_stats: [
        { stat_type: 'Batting', h: 10 },
        { stat_type: 'Pitching', ip: 9.0 }
      ]
    }
  end

  before { allow(Crawler).to receive(:stats).and_return(stats_data) }

  it 'persists a batting and pitching stat for each team, and a batting stat for each player row' do
    expect { described_class.perform_now(game.id) }
      .to change(BattingStat, :count).by(4)
      .and change(PitchingStat, :count).by(2)
  end

  it "raises if the roster hasn't synced yet instead of silently creating a player" do
    away_player.destroy!

    expect { described_class.perform_now(game.id) }.to raise_error(ActiveRecord::RecordNotFound)
  end

  it "updates the player's position for this game, even though the roster already set one" do
    expect { described_class.perform_now(game.id) }.to change { home_player.reload.position }.from('RF').to('DH')
  end

  it 'derives each player\'s batted-ball-type counts from the play-by-play text' do
    described_class.perform_now(game.id)

    judge_stat = BattingStat.find_by!(model: home_team.players.find_by!(abbr: 'judgeaa01'))
    expect(judge_stat).to have_attributes(fb: 1, gb: 0, ld: 0)

    devers_stat = BattingStat.find_by!(model: away_team.players.find_by!(abbr: 'deversra01'))
    expect(devers_stat).to have_attributes(fb: 0, gb: 1, ld: 0)
  end

  # Database::Builder::Play#on_mound (pre-existing legacy logic, unchanged
  # by this job) resolves to whichever team is *batting*, not the team
  # whose pitcher is actually on the mound -- so PlayStore's team-keyed
  # "pitchers" bucket is really keyed by the batting team. This job inherits
  # that bug for team-level hit-type aggregation; asserting the batting
  # team's values here documents the current behavior, not correct behavior.
  it 'aggregates batted-ball-type counts at the team level, keyed by whichever team is batting (pre-existing bug, see comment)' do
    described_class.perform_now(game.id)

    home_batting = BattingStat.find_by!(model: home_team)
    expect(home_batting).to have_attributes(fb: 1, gb: 0)

    away_batting = BattingStat.find_by!(model: away_team)
    expect(away_batting).to have_attributes(fb: 0, gb: 1)
  end
end
