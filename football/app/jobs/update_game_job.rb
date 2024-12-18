class UpdateGameJob < ApplicationJob
  queue_as :default

  TEAM_ATTRIBUTES = %i[name abbr].freeze
  def perform(espn_id, season_id)
    @season = Season.find(season_id)
    @boxscore_data = Crawler.boxscore(espn_id: espn_id, league: @season.league)
    @game = Game.find_or_create_by!(
      espn_id: espn_id,
      season: @season,
      away_team: @season.teams.find_or_create_by!(@boxscore_data[:away_team].slice(*TEAM_ATTRIBUTES)),
      home_team: @season.teams.find_or_create_by!(@boxscore_data[:home_team].slice(*TEAM_ATTRIBUTES))
    )
    update
  end

  def update
    update_game
    update_stats
    update_kicked
    @game.update(calculated_at: DateTime.now)
    game_attributes = GameSerializer.new(@game).serializable_hash[:data][:attributes]
    game_attributes[:away_full_game_stat] = game_attributes[:away_full_game_stat].serializable_hash[:data][:attributes]
    RedisPublisher.publish('UPDATED_GAME', game_attributes)
  end

  def update_game
    start_time = DateTime.parse(@boxscore_data[:start_time])
    is_second_half = @game.halftime? && @boxscore_data[:game_clock] != GAME_CLOCKS[:halftime]
    @game.update!(
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
    @game.stats.find_or_create_by!(team: team, interval: :full_game).update(stat_data)
    return unless @boxscore_data[:game_clock] == GAME_CLOCKS[:halftime]

    @game.stats.find_or_create_by!(team: team, interval: :first_half).update(stat_data)
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
    kicking_team = playbyplay[:received] == @game.home_team.name ? @game.home_team : @game.away_team
    @game.update!(kicking_team: kicking_team)
  end
end
