class MlbSyncTeamsJob < ApplicationJob
  queue_as :default

  def perform(year)
    season = Season.find_or_create_by!(year: year)
    teams_data = Crawler.teams(season: year)
    teams_data[:teams].each { |team_data| build_team(season, team_data) }

    MlbSyncRosterJob.set(queue: queue_name).perform_later(year, season.teams.pluck(:abbr))
  end

  private

  def build_team(season, team_data)
    team = Team.find_or_create_by!(season: season, abbr: team_data[:abbr])
    team.update!(
      name: team_data[:name],
      city: team_data[:city],
      timezone: Database::Builder::Const::Timezones::TEAMS[team_data[:abbr].to_sym]
    )
  end
end
