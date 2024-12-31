class ScheduleUpdateGamesJob < ApplicationJob
  queue_as :default
  sidekiq_options lock: :until_executed

  def perform
    games_needing_update.each do |game|
      ActiveRecord::Base.transaction do
        game.update!(enqueued_at: DateTime.now)
        UpdateGameJob.perform_later(game.espn_id, game.season_id, game.week)
      end
    end
  end

  def games_needing_update
    Game.where(date: DateTime.today).started.order(updated_at: :asc).reject do |game|
      game.enqueued? || game.finished? || (game.second_half? && DateTime.now < game.start_time + 6.hours)
    end
  end

  after_perform do
    self.class.set(wait: 30.seconds).perform_later
  end
end
