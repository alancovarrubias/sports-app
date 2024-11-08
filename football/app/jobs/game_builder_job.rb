class GameBuilderJob < ApplicationJob
  queue_as :default

  def perform
    Season.leagues.each_key do |league|
      schedule_data = Crawler.schedule(league: league)
      season = Season.find_or_create_by(year: schedule_data['year'], league: league)
      schedule_data['espn_ids'].each do |espn_id|
        GameUpdaterJob.perform_later(espn_id, season.id)
      end
    end
  end
end
