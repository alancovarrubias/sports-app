class DateGamesJob < ApplicationJob
  queue_as :default

  def perform
    date = DateTime.now.pacific_time_date
    games = Game.includes(:season).where(date: date).order(updated_at: :asc)
    games.each do |game|
      GameUpdaterJob.perform_later(game.espn_id, game.season_id)
    end
  end
end
