class NbaSyncTeamsJob < ApplicationJob
  queue_as :default

  def perform(year)
    season = Season.find_or_create_by!(year: year)
    teams_data = Crawler.teams(season: year)
    teams_data[:teams].each { |team_data| build_team(season, team_data) }

    season.teams.each { |team| NbaSyncRosterJob.set(queue: queue_name).perform_later(year, team.abbr) }
    NbaSyncScheduleJob.set(queue: queue_name).perform_later(year)
  end

  private

  def build_team(season, team_data)
    team = Team.find_or_create_by!(season: season, abbr: team_data[:abbr])
    team.update!(name: team_data[:name], city: team_data[:city])
  end
end
