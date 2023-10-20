class GameUpdater
  def initialize(game, season)
    @game = game
    @season = season
  end

  def update(boxscore_data)
    @boxscore_data = boxscore_data
    game_clock = @boxscore_data['game_clock']
    game_clock = 'Second Half' if @game.game_clock == 'Halftime' && @boxscore_data['game_clock'] != 'Halftime'
    update_game(game_clock)
    update_stats unless ['Not Started', 'Second Half'].include?(game_clock)
  end

  def update_game(game_clock)
    start_time = DateTime.parse(@boxscore_data['start_time'])
    @game.update(
      date: start_time.pacific_time_date,
      start_time: start_time,
      game_clock: game_clock,
      away_team: build_team('away_team'),
      home_team: build_team('home_team')
    )
  end

  def build_team(team_name)
    team_data = @boxscore_data[team_name]
    name = team_data.delete('name')
    abbr = team_data.delete('abbr')
    team = @season.teams.find_or_create_by(name: name)
    team.update(abbr: abbr)
    team
  end

  def update_stats
    KickedUpdaterJob.perform_later(@game.id) unless @game.kicked
    build_stat('away_team')
    build_stat('home_team')
  end

  def build_stat(team_name)
    team_data = @boxscore_data[team_name]
    team = @game.send(team_name)
    full_game_stat = @game.stats.find_or_create_by(team: team, interval: :full_game)
    team_data['completions'], team_data['attempts'] = team_data.delete('comp_att').split('/')

    team_data = team_data.transform_values(&:to_i)
    full_game_stat.update(team_data)
    return unless @boxscore_data['game_clock'] == 'Halftime'

    first_half_stat = @game.stats.find_or_create_by(team: team, interval: :first_half)
    first_half_stat.update(team_data)
  end
end

class GameUpdaterJob < ApplicationJob
  queue_as :default

  def perform(espn_id, season_id, options = {})
    season = Season.find(season_id)
    options[:espn_id] = espn_id
    game = season.games.find_or_create_by(options)
    boxscore_data = @crawler_client.boxscore(espn_id: espn_id, league: season.league)
    GameUpdater.new(game, season).update(boxscore_data)
    game.update(stats_calculated_at: DateTime.now)
  end
end
