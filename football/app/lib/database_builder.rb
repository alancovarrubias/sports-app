class DatabaseBuilder
  def run
    season = Season.find_or_create_by(year: 2023)
    data = query('http://crawler:5000/api/games?year=2023&week=1')
    data['espn_game_ids'].map do |game_id|
      res = query("http://crawler:5000/api/games/#{game_id}")
      away_name = res['game']['away_team']['name']
      home_name = res['game']['home_team']['name']
      away_team = season.teams.find_or_create_by(name: away_name)
      home_team = season.teams.find_or_create_by(name: home_name)
      game = season.games.find_or_create_by(espn_id: game_id, away_team: away_team, home_team: home_team)
      game.update(game_clock: res['game']['game_clock'], start_time: res['game']['start_time'])
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
end
