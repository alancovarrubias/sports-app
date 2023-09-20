class DatabaseBuilder
  GAMES_URL = 'http://crawler:5000/api/games'.freeze
  def run(options = {})
    url = get_games_url(options)
    games_res = query(url)
    @season = Season.find_or_create_by(year: games_res['year'])
    games_res['espn_game_ids'].map do |game_id|
      @playbyplay_data = query("#{GAMES_URL}/#{game_id}/playbyplay")['game']
      @game_data = query("#{GAMES_URL}/#{game_id}")['game']
      build_game(game_id, games_res['week'])
      build_stat(@game.away_team, @game_data['away_team'])
      build_stat(@game.home_team, @game_data['home_team'])
    end
  end

  def get_games_url(year: nil, week: nil)
    year && week ? "#{GAMES_URL}?year=#{year}&week=#{week}" : GAMES_URL
  end

  def query(url)
    url = URI.parse(url)
    res = Net::HTTP.get_response(url)
    JSON.parse(res.body)
  end

  def kicked
    kicked_to_team_abbr = {
      'HST' => 'HOU'
    }
    kicked_abbr = @playbyplay_data['kicked']
    team_abbr = kicked_to_team_abbr[kicked_abbr] || kicked_abbr
    if team_abbr == @game.away_team.abbr
      :away
    elsif team_abbr == @game.home_team.abbr
      :home
    end
  end

  def build_game(game_id, week)
    away_team = build_team(@game_data['away_team'])
    home_team = build_team(@game_data['home_team'])
    @game = @season.games.find_or_create_by(espn_id: game_id, away_team: away_team, home_team: home_team, week: week)
    start_time = DateTime.parse(@game_data['start_time'])
    date = start_time.in_time_zone('Pacific Time (US & Canada)').to_date
    @game.update(game_clock: @game_data['game_clock'], start_time: start_time, date: date, kicked: kicked)
  end

  def build_team(team_data)
    team_name = team_data.delete('name')
    team_abbr = team_data.delete('abbr')
    @season.teams.find_or_create_by(name: team_name, abbr: team_abbr)
  end

  def build_stat(team, team_data)
    stat = @game.stats.find_or_create_by(team: team, interval: :full_game)
    team_data['completions'], team_data['attempts'] = team_data.delete('comp_att').split('/')
    stat.update(team_data)
  end
end
