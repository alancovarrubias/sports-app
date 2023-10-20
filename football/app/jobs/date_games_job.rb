class GameScheduler
  def initialize(game)
    @game = game
  end

  def schedule_game
    return if job_already_enqueued? || finished? || not_started? || recently_second_half?

    @game.update(stats_enqueued_at: DateTime.now)
    GameUpdaterJob.perform_later(@game.espn_id, @game.season_id)
  end

  def job_already_enqueued?
    return false unless @game.stats_enqueued_at
    return true unless @game.stats_calculated_at

    @game.stats_enqueued_at > @game.stats_calculated_at
  end

  def not_started?
    DateTime.now < @game.start_time
  end

  def finished?
    @game.game_clock&.include?('Final')
  end

  def recently_second_half?
    @game.game_clock == 'Second Half' && DateTime.now < @game.start_time + 6.hours
  end
end
class DateGamesJob < ApplicationJob
  queue_as :default

  def perform
    games = Game.on_date(DateTime.now.pacific_time_date).last_updated_first
    games.each do |game|
      GameScheduler.new(game).schedule_game
    end
  end

  after_perform do
    DateGamesJob.set(wait: 30.seconds).perform_later
  end
end
