class NbaSyncTeamsJob < ApplicationJob
  queue_as :default

  def perform(year)
    season = Season.find_or_create_by!(year: year)
    teams_data = Crawler.teams(season: year)
    teams_data[:teams].each { |team_data| build_team(season, team_data) }

    NbaSyncRosterJob.set(queue: queue_name).perform_later(year, season.teams.pluck(:abbr))
  end

  private

  def build_team(season, team_data)
    Team.find_or_create_by!(season: season, abbr: team_data[:abbr]) do |t|
      t.name = team_data[:name]
      t.city = team_data[:city]
    end
  end
end
