class MlbSyncTeamsJob < ApplicationJob
  queue_as :default

  def perform(year)
    season = Season.find_or_create_by!(year: year)
    teams_data = Crawler.teams(season: year)
    teams_data[:teams].each { |team_data| build_team(season, team_data) }

    season.teams.each do |team|
      MlbSyncRosterJob.set(queue: queue_name).perform_later(year, team.abbr)
      MlbSyncScheduleJob.set(queue: queue_name).perform_later(year, team.abbr)
    end
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
