class NbaSyncGameStatsJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    game = Game.find(game_id)
    stats_data = Crawler.stats(
      game_url: game.url,
      away_team: game.away_team.abbr,
      home_team: game.home_team.abbr
    )

    build_team_stats(game, :away_team, stats_data[:away_team_stats])
    build_team_stats(game, :home_team, stats_data[:home_team_stats])
    build_player_stats(game, :away_team, stats_data[:away_player_stats])
    build_player_stats(game, :home_team, stats_data[:home_player_stats])
  end

  private

  def build_team_stats(game, side, stats)
    team = game.send(side)
    stats.each { |stat_data| persist_stat(game, team, stat_data) }
  end

  def build_player_stats(game, side, stats)
    team = game.send(side)
    stats.each do |stat_data|
      player = team.players.find_by!(abbr: stat_data[:abbr])
      persist_stat(game, player, stat_data)
    end
  end

  def persist_stat(game, model, stat_data)
    stat = Stat.find_or_create_by!(interval: game, model: model)
    stat.update!(stat_data.except(:abbr))
  end
end
