class LeagueGamesJob < ApplicationJob
  queue_as :default

  def perform(season_league, espn_league)
    @schedule_data = @crawler_client.schedule(league: espn_league)
    @season = Season.find_or_create_by(year: @schedule_data['year'], league: season_league)
    schedule_game_updates
  end

  def schedule_game_updates
    @schedule_data['espn_ids'].each do |espn_id|
      GameUpdaterJob.perform_later(espn_id, @season.id, week: @schedule_data['week'])
    end
  end
end
