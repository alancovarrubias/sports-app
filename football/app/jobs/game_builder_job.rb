class GameBuilderJob < ApplicationJob
  queue_as :default

  def perform
    Season.leagues.each_key do |league|
      build_games(league).each do |game|
        GameUpdaterJob.perform_later(game.id)
      end
    end
  end

  def build_games(league)
    schedule_data = Crawler.schedule(league: league)
    season = Season.find_or_create_by(year: schedule_data['year'], league: league)
    schedule_data['espn_ids'].map do |espn_id|
      season.games.find_or_create_by(espn_id: espn_id, week: schedule_data['week'])
    end
  end
end
