class DateGamesJob < ApplicationJob
  queue_as :default

  def perform
    date = DateTime.now.pacific_time_date
    games = Game.includes(:season).where(date: date).order(updated_at: :asc)
    games.each do |game|
      next if game.stats_job_enqueued? || game.finished? || !game.started? || game.recently_second_half?

      game.update(stats_enqueued_at: DateTime.now)
      GameUpdaterJob.perform_later(game.espn_id, game.season_id)
    end
  end

  after_perform do
    DateGamesJob.set(wait: 30.seconds).perform_later
  end
end
