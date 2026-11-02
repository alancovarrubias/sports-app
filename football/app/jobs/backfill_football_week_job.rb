class BackfillFootballWeekJob < ApplicationJob
  queue_as :backfill
  sidekiq_options lock: :until_executed

  def perform(league, year, week)
    schedule_data = Crawler.schedule(league: league, year: year, week: week)
    verify_schedule!(schedule_data, year, week)

    season = Season.find_or_create_by!(year: year, league: league)
    schedule_data[:espn_ids].each do |espn_id|
      UpdateGameJob.set(queue: :backfill).perform_later(espn_id, season.id, week)
    end

    enqueue_remaining_weeks(league, year, schedule_data[:week_count]) if week == 1
  end

  private

  def verify_schedule!(schedule_data, year, week)
    return if schedule_data[:year].to_i == year && schedule_data[:week].to_i == week

    raise "ESPN served (#{schedule_data[:year]}, #{schedule_data[:week]}) for requested (#{year}, #{week})"
  end

  def enqueue_remaining_weeks(league, year, week_count)
    (2..week_count.to_i).each do |week|
      BackfillFootballWeekJob.perform_later(league, year, week)
    end
  end
end
