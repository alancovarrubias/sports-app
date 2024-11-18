class CreateGamesJob < ApplicationJob
  queue_as :default

  def perform
    LEAGUES.each do |league|
      schedule_data = Crawler.schedule(league: league)
      season = Season.find_or_create_by(year: schedule_data[:year], league: league)
      schedule_data[:espn_ids].each do |espn_id|
        UpdateGameJob.perform_later(espn_id, season.id)
      end
    end
  end
end
