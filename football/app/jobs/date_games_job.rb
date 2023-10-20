class GameScheduler
  def initialize(game)
    @game = game
  end

  def schedule_game
    return if doesnt_need_parsing?

    @game.update(stats_enqueued_at: DateTime.now)
    GameUpdaterJob.perform_later(@game.espn_id, @game.season_id)
  end

  def doesnt_need_parsing?
    job_already_enqueued? || @game.finished? || @game.not_started? || @game.recently_second_half?
  end

  def job_already_enqueued?
    return false unless @game.stats_enqueued_at
    return true unless @game.stats_calculated_at

    @game.stats_enqueued_at > @game.stats_calculated_at
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
