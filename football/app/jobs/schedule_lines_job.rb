class ScheduleLinesJob < ApplicationJob
  queue_as :default

  def perform
    Season.leagues.each_key do |league|
      games = Season.find_by(league: league).games
      opener_games = games.not_started.reject(&:full_game_opener)
      LinesJob.perform_later(league, opener_games.map(&:id), []) unless opener_games.empty?
      closer_games = games.started.reject(&:full_game_closer)
      LinesJob.perform_later(league, [], closer_games.map(&:id)) unless closer_games.empty?
    end
  end

  after_perform do
    ScheduleLinesJob.set(wait: 5.minutes).perform_later
  end
end
