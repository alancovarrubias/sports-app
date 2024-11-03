class GameUpdaterJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    @game = Game.find(game_id)
    @boxscore_data = Crawler.boxscore(espn_id: @game.espn_id, league: @game.season.league)
    update_game
    update_stats
    update_kicked
    @game.update(calculated_at: DateTime.now)
  end

  def update_game
    start_time = DateTime.parse(@boxscore_data['start_time'])
    @game.update(
      date: start_time.pacific_time_date,
      start_time: start_time,
      game_clock: game_clock,
      away_team: build_team(@boxscore_data['away_team']),
      home_team: build_team(@boxscore_data['home_team'])
    )
  end

  def game_clock
    return 'Second Half' if @game.game_clock == 'Halftime' && @boxscore_data['game_clock'] != 'Halftime'

    @boxscore_data['game_clock']
  end

  def build_team(team_data)
    Team.find_or_create_by(name: team_data['name'], abbr: team_data['abbr'], season: @game.season)
  end

  def update_stats
    return if ['Not Started', 'Second Half'].include?(@game.game_clock)

    build_stat(@game.away_team, @boxscore_data['away_team'])
    build_stat(@game.home_team, @boxscore_data['home_team'])
  end

  def build_stat(team, team_data)
    team_data['completions'], team_data['attempts'] = team_data['comp_att'].split('/')

    stat_data = team_data.except('name', 'abbr', 'comp_att').transform_values(&:to_i)
    Stat.find_or_create_by(game: @game, team: team, interval: 'full_game').update(stat_data)
    return unless @boxscore_data['game_clock'] == 'Halftime'

    Stat.find_or_create_by(game: @game, team: team, interval: 'first_half').update(stat_data)
  end

  def update_kicked
    return if @game.kicked || @game.game_clock == 'Not Started'

    playbyplay = Crawler.playbyplay(
      espn_id: @game.espn_id,
      finished: @game.finished? ? 1 : 0,
      league: @game.season.league
    )
    @game.update(kicked: kicked(playbyplay['received']))
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
