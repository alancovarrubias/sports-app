class NbaSyncScheduleJob < ApplicationJob
  queue_as :default

  def perform(year)
    season = Season.find_by!(year: year)
    games_data = Crawler.games(season: year)

    games_data[:games].each do |game_data|
      game = build_game(season, game_data)
      NbaSyncGameStatsJob.set(queue: queue_name).perform_later(game.id)
    end
  end

  private

  def build_game(season, game_data)
    date = parse_date(game_data[:date])
    away_team = season.teams.find_by!(abbr: game_data[:away_team])
    home_team = season.teams.find_by!(abbr: game_data[:home_team])

    game = Game.find_or_create_by!(season: season, date: date, home_team: home_team)
    game.update!(away_team: away_team)
    game
  end

  # The crawler already strips basketball-reference's sortable `csk`
  # timestamp down to an 8-digit YYYYMMDD string before returning it.
  def parse_date(date)
    Date.new(date[0...4].to_i, date[4...6].to_i, date[6...8].to_i)
  end
end
