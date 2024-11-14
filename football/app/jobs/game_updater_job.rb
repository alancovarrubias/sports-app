class GameUpdaterJob < ApplicationJob
  queue_as :default

  TEAM_ATTRIBUTES = [:name, :abbr]
  def perform(espn_id, season_id)
    @season = Season.find(season_id)
    @boxscore_data = Crawler.boxscore(espn_id: espn_id, league: @season.league)
    @game = Game.find_or_create_by(
      espn_id: espn_id,
      season: @season,
      away_team: @season.teams.find_or_create_by(@boxscore_data[:away_team].slice(TEAM_ATTRIBUTES)),
      home_team: @season.teams.find_or_create_by(@boxscore_data[:home_team].slice(TEAM_ATTRIBUTES))
    )
    update_game
    update_stats
    update_kicked
    @game.update(calculated_at: DateTime.now)
  end

  def update_game
    start_time = DateTime.parse(@boxscore_data[:start_time])
    is_second_half = @game.halftime? && @boxscore_data[:game_clock] != 'Halftime'
    @game.update(
      date: start_time.pacific_time_date,
      start_time: start_time,
      game_clock: is_second_half ? 'Second Half' : @boxscore_data[:game_clock]
    )
  end

  def update_stats
    return if @game.not_started? || @game.second_half?

    build_stat(@game.away_team, @boxscore_data[:away_team])
    build_stat(@game.home_team, @boxscore_data[:home_team])
  end

  def build_stat(team, team_data)
    team_data[:completions], team_data[:attempts] = team_data.delete(:comp_att).split('/')
    stat_data = team_data.except(TEAM_ATTRIBUTES).transform_values(&:to_i)
    Stat.find_or_create_by(game: @game, team: team, interval: :full_game).update(stat_data)
    return unless @boxscore_data[:game_clock] == 'Halftime'

    Stat.find_or_create_by(game: @game, team: team, interval: :first_half).update(stat_data)
  end

  def update_kicked
    return if @game.kicked || @game.not_started?

    playbyplay = Crawler.playbyplay(
      espn_id: @game.espn_id,
      finished: @game.finished? ? 1 : 0,
      league: @game.season.league
    )
    @game.update(kicked: kicked(playbyplay[:received]))
  end

  def kicked(receiving_team)
    case receiving_team
    when @game.home_team.name
      :away
    when @game.away_team.name
      :home
    end
  end
end
