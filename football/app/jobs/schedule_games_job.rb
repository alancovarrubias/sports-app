class ScheduleGamesJob < ApplicationJob
  queue_as :default

  def perform
    Season.leagues.each_key do |season_league|
      schedule_games(season_league)
    end
  end

  def schedule_games(season_league)
    case season_league
    when 'nfl'
      LeagueGamesJob.perform_later(season_league, season_league)
    when 'cfb'
      LeagueGamesJob.perform_later(season_league, 'cfb80')
      LeagueGamesJob.perform_later(season_league, 'cfb81')
    end
  end
end
