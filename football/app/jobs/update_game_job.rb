class UpdateGameJob < ApplicationJob
  queue_as :default

  def perform(espn_id, season_id, week)
    @season = Season.find(season_id)
    @gamecast_data = Crawler.gamecast(espn_id: espn_id, league: @season.league)
    @boxscore_data = Crawler.boxscore(espn_id: espn_id, league: @season.league)
    @game = Game.find_or_create_by!(
      espn_id: espn_id,
      season: @season,
      away_team: build_team(:away_team),
      home_team: build_team(:home_team),
      week: week
    )
    update
  end

  def build_team(team_type)
    team_data = @gamecast_data[team_type]
    name = team_data.delete(:name)
    abbr = team_data.delete(:abbr)
    team = @season.teams.find_or_create_by!(name: name)
    return team if team.abbr || abbr.blank?

    team.update!(abbr: abbr)
    team
  end

  def update
    update_gamecast
    update_boxscore
    update_stats
    update_kicked
    @game.update!(calculated_at: DateTime.now)
    @game.notify_update
  end

  def update_gamecast
    start_time = DateTime.parse(@gamecast_data[:start_time])
    @game.update!(
      date: start_time.pacific_time_date,
      start_time: start_time
    )
  end

  def update_boxscore
    @game.update!(
      game_clock: is_second_half? ? GAME_CLOCKS[:second_half] : @boxscore_data[:game_clock]
    )
  end

  def update_stats
    return if @game.not_started? || @game.second_half?

    update_stat(:away_team)
    update_stat(:home_team)
  end

  def update_stat(team_type)
    team = @game.send(team_type)
    stat_data = build_stat_data(@boxscore_data[team_type])
    @game.stats.find_or_create_by!(team: team, interval: :full_game).update(stat_data)
    return unless @boxscore_data[:game_clock] == GAME_CLOCKS[:halftime]

    @game.stats.find_or_create_by!(team: team, interval: :first_half).update(stat_data)
  end

  def build_stat_data(team_data)
    team_data[:completions], team_data[:attempts] = team_data.delete(:comp_att).split('/')
    team_data.transform_values(&:to_i)
  end

  def update_kicked
    return if @game.kicking_team || @game.not_started?

    playbyplay = Crawler.playbyplay(
      espn_id: @game.espn_id,
      finished: @game.finished? ? 1 : 0,
      league: @season.league
    )
    kicking_team = playbyplay[:received] == @game.home_team.name ? @game.home_team : @game.away_team
    @game.update!(kicking_team: kicking_team)
  end

  def is_second_half?
    @game.halftime? && @boxscore_data[:game_clock] != GAME_CLOCKS[:halftime]
  end
end
