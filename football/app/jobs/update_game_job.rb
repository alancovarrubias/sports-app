class UpdateGameJob < ApplicationJob
  queue_as :default

  TEAM_ATTRIBUTES = %i[name abbr].freeze
  def perform(espn_id, season_id)
    @season = Season.find(season_id)
    @boxscore_data = Crawler.boxscore(espn_id: espn_id, league: @season.league)
    @game = Game.find_or_create_by(
      espn_id: espn_id,
      season: @season,
      away_team: find_or_create_team(@boxscore_data[:away_team]),
      home_team: find_or_create_team(@boxscore_data[:home_team])
    )
    update
  end

  def find_or_create_team(team_data)
    team = @season.teams.find_or_create_by(name: team_data[:name])
    team.update(abbr: team_data[:abbr]) && team
  end

  def update
    update_game
    update_stats
    update_kicked
    @game.update(calculated_at: DateTime.now)
  end

  def update_game
    start_time = DateTime.parse(@boxscore_data[:start_time])
    is_second_half = @game.halftime? && @boxscore_data[:game_clock] != GAME_CLOCKS[:halftime]
    @game.update(
      date: start_time.pacific_time_date,
      start_time: start_time,
      game_clock: is_second_half ? GAME_CLOCKS[:second_half] : @boxscore_data[:game_clock]
    )
  end

  def update_stats
    return if @game.not_started? || @game.second_half?

    update_stat(:away_team)
    update_stat(:home_team)
  end

  def update_stat(team_name)
    team = @game.send(team_name)
    stat_data = build_stat_data(@boxscore_data[team_name])
    @game.stats.find_or_create_by(team: team, interval: :full_game).update(stat_data)
    return unless @boxscore_data[:game_clock] == GAME_CLOCKS[:halftime]

    @game.stats.find_or_create_by(team: team, interval: :first_half).update(stat_data)
  end

  def build_stat_data(team_data)
    team_data[:completions], team_data[:attempts] = team_data.delete(:comp_att).split('/')
    team_data.except(*TEAM_ATTRIBUTES).transform_values(&:to_i)
  end

  def update_kicked
    return if @game.kicking_team || @game.not_started?

    playbyplay = Crawler.playbyplay(
      espn_id: @game.espn_id,
      finished: @game.finished? ? 1 : 0,
      league: @season.league
    )
    kicking_team = playbyplay[:received] == @game.home_team.name ? @game.away_team : @game.home_team
    @game.update(kicking_team: kicking_team)
  end
end
