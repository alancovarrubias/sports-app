class ScheduleLinesJob < ApplicationJob
  queue_as :default

  def perform
    LEAGUES.each do |league|
      season = Season.find_by(league: league)
      games = Game.where(season_id: season.id)
      opener_games = games.not_started.reject(&:full_game_opener).map(&:id)
      closer_games = games.started.reject(&:full_game_closer).map(&:id)
      all_games = opener_games + closer_games
      LinesUpdaterJob.perform_later(league, opener_games, closer_games) unless all_games.empty?
    end
  end

  after_perform do
    self.class.set(wait: 5.minutes).perform_later
  end
end
