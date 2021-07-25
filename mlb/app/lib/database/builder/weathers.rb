module Database
  module Builder
    class Weathers < Base
      def needs_data?(_game)
        # game.weathers.empty?
        true
      end

      def build
        # @season.games.each do |game|
        game = @season.games.first
        # next unless needs_data?(game)

        puts "Building Weathers for Season #{game.id}"
        stadium_abbr = game.home_team.abbr
        lat, lng = Weather::Coordinates::TEAMS[stadium_abbr.to_sym]
        start_date = game.date
        end_date = start_date.next_day(1)

        # weather_res = query_server(:weathers, season: @season.year)
        # end
      end
    end
  end
end
