class MlbSyncScheduleJob < ApplicationJob
  queue_as :default

  def perform(year, team_abbr)
    season = Season.find_by!(year: year)
    team = season.teams.find_by!(abbr: team_abbr)

    # GamesScraper scrapes one team's full-season schedule but returns only
    # that team's home games, so `team` here is always the home team.
    games_data = Crawler.games(season: year, team: team_abbr)
    team.update!(link: games_data[:team_link])

    games_data[:games].each do |game_data|
      game = build_game(season, team, game_data)
      MlbSyncGameStatsJob.set(queue: queue_name).perform_later(game.id)
    end
  end

  private

  def build_game(season, home_team, game_data)
    away_team = season.teams.find_by!(abbr: game_data[:away_team])
    game = Game.find_or_create_by!(
      season: season,
      date: Date.parse(game_data[:date]),
      home_team: home_team,
      num: game_data[:num].to_i
    )
    game.update!(away_team: away_team)
    game
  end
end
