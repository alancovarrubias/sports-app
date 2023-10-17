class GameUpdaterJob < ApplicationJob
  queue_as :default

  def perform(espn_id, season_id, options = {})
    @crawler_client = Crawler::Client.new
    @season = Season.find(season_id)
    @game = @season.games.find_or_create_by(espn_id: espn_id)
    @options = options
    @boxscore_data = @crawler_client.boxscore(espn_id: espn_id, league: @season.league)
    game_clock = @boxscore_data['game_clock']
    game_clock = 'Second Half' if @game.game_clock == 'Halftime' && @boxscore_data['game_clock'] != 'Halftime'
    update_game(game_clock)
    return if ['Not Started', 'Second Half'].include?(game_clock)

    finished = game_clock == 'Final' ? 1 : 0
    unless @game.kicked
      @playbyplay_data = @crawler_client.playbyplay(espn_id: @game.espn_id, finished: finished,
                                                    league: @season.league)
      @game.update(kicked: kicked)
    end
    build_stat('away_team')
    build_stat('home_team')
  end

  def game_finished
    @game.game_clock&.include?('Final')
  end

  def game_not_started
    @game.start_time && DateTime.now < @game.start_time
  end

  def game_recently_second_half
    @game.game_clock == 'Second Half' && DateTime.now < @game.start_time + 6.hours
  end

  def update_game(game_clock)
    start_time = DateTime.parse(@boxscore_data['start_time'])
    game_options = @options.merge(
      date: start_time.pacific_time_date,
      start_time: start_time,
      game_clock: game_clock,
      away_team: build_team('away_team'),
      home_team: build_team('home_team')
    )
    @game.update(game_options)
  end

  def build_team(team_name)
    team_data = @boxscore_data[team_name]
    name = team_data.delete('name')
    abbr = team_data.delete('abbr')
    team = @season.teams.find_or_create_by(name: name)
    team.update(abbr: abbr)
    team
  end

  def kicked
    case @playbyplay_data['received']
    when @game.home_team.name
      :away
    when @game.away_team.name
      :home
    end
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
