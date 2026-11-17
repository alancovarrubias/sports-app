class MlbSyncRosterJob < ApplicationJob
  queue_as :default

  def perform(year, team_abbrs)
    team_abbr, *remaining_abbrs = team_abbrs
    season = Season.find_by!(year: year)
    team = season.teams.find_by!(abbr: team_abbr)

    players_data = Crawler.players(season: year, team: team_abbr)
    players_data[:players].each { |player_data| build_player(season, team, player_data) }

    if remaining_abbrs.any?
      MlbSyncRosterJob.set(queue: queue_name).perform_later(year, remaining_abbrs)
    else
      # A game's box score can carry either team's players, so every
      # team's roster must be synced -- not just its own -- before any
      # team's schedule/stats processing starts.
      season.teams.each { |t| MlbSyncScheduleJob.set(queue: queue_name).perform_later(year, t.abbr) }
    end
  end

  private

  def build_player(season, team, player_data)
    player = Player.find_or_create_by!(season: season, team: team, abbr: player_data[:abbr]) do |p|
      p.name = player_data[:name]
    end
    player.update!(name: player_data[:name], position: player_data[:position])
  end
end
