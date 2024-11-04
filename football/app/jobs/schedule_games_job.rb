class ScheduleGamesJob < ApplicationJob
  queue_as :default

  def perform
    games_needing_update.each do |game|
      ActiveRecord::Base.transaction do
        game.update!(enqueued_at: DateTime.now)
        GameUpdaterJob.perform_later(game.espn_id, game.season_id)
      end
    end
  end

  def games_needing_update
    Game.where(date: DateTime.today).started.order(updated_at: :asc).reject do |game|
      game.enqueued? || game.finished? || game.recently_second_half?
    end
  end

  after_perform do
    self.class.set(wait: 30.seconds).perform_later
  end
end
