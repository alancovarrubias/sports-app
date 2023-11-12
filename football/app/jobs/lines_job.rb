class LinesJob < ApplicationJob
  queue_as :default

  def perform(league, opener_ids, closer_ids)
    lines_data = @crawler_client.lines(league: league)
    week = lines_data['week']
    lines_data['games'].each do |game_data|
      @game_data = game_data
      @game = find_game(week)
      next unless @game

      build_lines('opener') if opener_ids.include?(@game.id)
      build_lines('closer') if closer_ids.include?(@game.id)
    end
  end

  def build_lines(book)
    line = @game.lines.find_or_create_by(interval: :full_game, book: book)
    line_data = parse_line_data(@game_data['full_game'])
    line.update(line_data)
  end

  def find_game(week)
    away_team = find_team(@game_data['away_team'])
    home_team = find_team(@game_data['home_team'])
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
