class DatabaseBuilder
  def run
    @season = Season.find_or_create_by(year: 2023)
    game_ids = query('http://crawler:5000/api/games?year=2023&week=1')['espn_game_ids']
    game_ids.map do |game_id|
      @game_data = query("http://crawler:5000/api/games/#{game_id}")['game']
      build_game(game_id)
      build_stat(@game.away_team, @game_data['away_team'])
      build_stat(@game.home_team, @game_data['home_team'])
    end
  end

  def query(url)
    url = URI.parse(url)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port, read_timeout: 500) do |http|
      http.request(req)
    end
    JSON.parse(res.body)
  end

  def build_game(game_id)
    away_team = build_team(@game_data['away_team'])
    home_team = build_team(@game_data['home_team'])
    @game = @season.games.find_or_create_by(espn_id: game_id, away_team: away_team, home_team: home_team)
    @game.update(game_clock: @game_data['game_clock'], start_time: @game_data['start_time'])
  end

  def build_team(team_data)
    team_name = team_data.delete('name')
    @season.teams.find_or_create_by(name: team_name)
  end

  def build_stat(team, team_data)
    stat = @game.stats.find_or_create_by(team: team, interval: 'Full Game')
    team_data['completions'], team_data['attempts'] = team_data.delete('comp_att').split('/')
    stat.update(team_data)
  end
end
