module Database
  module Builder
    class Game < Base
      def build
        return unless needs_data?

        puts "Building Games for Season #{@season.id}"

        games_res = query_server(:games, season: @season.year)
        games_res['games'].each do |game_data|
          build_game(game_data)
        end
      end

      def build_game(game_data)
        game_attributes = {
          season: @season,
          date: build_date(game_data['date']),
          away_team: @season.teams.find_by_abbr(game_data['away_team']),
          home_team: @season.teams.find_by_abbr(game_data['home_team'])
        }
        ::Game.create(game_attributes)
      end

      def build_date(date)
        Date.new(date[0...4].to_i, date[4...6].to_i, date[6...8].to_i)
      end

      def needs_data?
        @season.games.empty?
      end
    end
  end
end
