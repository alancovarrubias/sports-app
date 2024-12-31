class CreateGamesJob < ApplicationJob
  queue_as :default
  sidekiq_options lock: :until_executed

  def perform
    LEAGUES.each do |league|
      schedule_data = Crawler.schedule(league: league)
      season = Season.find_or_create_by!(year: schedule_data[:year], league: league)
      schedule_data[:espn_ids].each do |espn_id|
        next if Game.find_by_espn_id(espn_id)

        UpdateGameJob.perform_later(espn_id, season.id, schedule_data[:week])
      end
    end
  end
end
