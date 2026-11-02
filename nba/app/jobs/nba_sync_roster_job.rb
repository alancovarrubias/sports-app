class NbaSyncRosterJob < ApplicationJob
  queue_as :default

  def perform(year, team_abbr)
    season = Season.find_by!(year: year)
    team = season.teams.find_by!(abbr: team_abbr)

    players_data = Crawler.players(season: year, team: team_abbr)
    players_data[:players].each { |player_data| build_player(season, team, player_data) }
  end

  private

  def build_player(season, team, player_data)
    player = Player.find_or_create_by!(season: season, team: team, abbr: player_data[:abbr])
    player.update!(name: player_data[:name], position: player_data[:position])
  end
end
