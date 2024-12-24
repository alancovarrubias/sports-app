class LinesUpdaterJob < ApplicationJob
  queue_as :default

  def perform(league, opener_ids, closer_ids)
    lines_data = Crawler.lines(league: league)
    lines_data[:games].each do |game_data|
      @game = Game.find_by(
        away_team: Team.find_like_name(game_data[:away_team][:name]),
        home_team: Team.find_like_name(game_data[:home_team][:name]),
        week: lines_data[:week]
      )
      next unless @game

      build_lines(game_data, book: 'opener', interval: 'full_game') if opener_ids.include?(@game.id)
      build_lines(game_data, book: 'closer', interval: 'full_game') if closer_ids.include?(@game.id)
    end
  end

  def build_lines(game_data, options)
    line_data = game_data[options[:interval]]
    line_data[:total].slice!(0)
    @game.lines.find_or_create_by(options).update(line_data)
  end
end
