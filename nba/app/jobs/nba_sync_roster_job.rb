class NbaSyncRosterJob < ApplicationJob
  queue_as :default

  def perform(year, team_abbrs)
    team_abbr, *remaining_abbrs = team_abbrs
    season = Season.find_by!(year: year)
    team = season.teams.find_by!(abbr: team_abbr)

    players_data = Crawler.players(season: year, team: team_abbr)
    players_data[:players].each { |player_data| build_player(season, team, player_data) }

    if remaining_abbrs.any?
      NbaSyncRosterJob.set(queue: queue_name).perform_later(year, remaining_abbrs)
    else
      NbaSyncScheduleJob.set(queue: queue_name).perform_later(year)
    end
  end

  private

  def build_player(season, team, player_data)
    Player.find_or_create_by!(season: season, team: team, abbr: player_data[:abbr]) do |p|
      p.name = player_data[:name]
      p.position = player_data[:position]
    end
  end
end
