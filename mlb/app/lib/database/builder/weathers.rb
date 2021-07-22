module Database
  module Builder
    class Weathers < Base
      def needs_data?(_game)
        # game.weathers.empty?
        true
      end

      def build
        puts @season.year
        @season.games.each do |game|
          next unless needs_data?(game)

          puts "Building Weathers for Season #{game.id}"
          stadium_abbr = game.home_team.abbr.to_sym
          lat, lng = Weather::Coordinates::TEAMS[abbr]
          puts lat
          puts lng

          # weather_res = query_server(:weathers, season: @season.year)
        end
      end
    end
  end
end
