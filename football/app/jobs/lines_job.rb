class LinesJob < ApplicationJob
  queue_as :default

  def perform(league)
    line_data = @crawler_client.lines(league: league)
    line_data['games'].each do |game_data|
      game = find_game(line_data, game_data)
      next unless game

      line = game.lines.find_or_create_by(interval: :full_game)
      line_data = parse_line_data(game_data['full_game'])
      line.update(line_data)
    end
  end

  def find_game(line_data, game_data)
    week = line_data['week']
    away_team = find_team(game_data['away_team'])
    home_team = find_team(game_data['home_team'])
    Game.find_by(week: week, away_team: away_team, home_team: home_team)
  end

  def find_team(team_data)
    Team.find_like_name(team_data['name'])
  end

  def parse_line_data(line_data)
    {
      spread: line_data['spread'],
      total: line_data['total'][1..]
    }
  end
end
