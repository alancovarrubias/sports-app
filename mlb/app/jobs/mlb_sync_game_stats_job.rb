class MlbSyncGameStatsJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    @game = Game.find(game_id)
    stats_data = Crawler.stats(game_url: @game.url)
    @store = Database::Builder::PlayStore.new(stats_data, @game)

    build_team_stats(:away_team, stats_data[:away_team_stats])
    build_team_stats(:home_team, stats_data[:home_team_stats])
    build_player_stats(:away_team, stats_data[:away_player_stats])
    build_player_stats(:home_team, stats_data[:home_player_stats])
  end

  private

  def build_team_stats(side, stats)
    team = @game.send(side)
    stats.each { |stat_data| persist_stat(team, team.abbr, stat_data) }
  end

  # Player rosters are synced independently (MlbSyncRosterJob) and may not
  # have run yet by the time stats come in, so look players up defensively
  # rather than assuming they already exist.
  def build_player_stats(side, stats)
    team = @game.send(side)
    stats.each do |stat_data|
      player = team.players.find_or_create_by!(season: @game.season, abbr: stat_data[:abbr])
      player.update!(name: stat_data[:name], position: stat_data[:position])
      persist_stat(player, player.name, stat_data)
    end
  end

  # PlayStore keys its hit-type map by player *name* (matching the
  # batter/pitcher names recorded in play-by-play text) and by team *abbr*
  # for team-level aggregation.
  def persist_stat(model, hit_type_key, stat_data)
    stat_type = stat_data[:stat_type]
    model_class = stat_type == 'Pitching' ? PitchingStat : BattingStat
    hit_types = @store.get_hit_types(stat_type, hit_type_key)

    attrs = stat_data.except(:stat_type, :name, :abbr, :position)
    attrs = attrs.merge(hit_types) if hit_types

    stat = model_class.find_or_create_by!(interval: @game, model: model)
    stat.update!(attrs)
  end
end
