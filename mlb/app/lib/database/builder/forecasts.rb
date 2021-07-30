module Database
  module Builder
    class Forecasts < Base
      def needs_data?(game)
       game.forecasts.empty?
      end

      def parse_temp
      end

      def build
        @season.games.each do |game|
          next unless needs_data?(game)

          puts "Building Forecasts for Season #{game.id}"
          team = game.home_team.abbr
          date = game.date.strftime("%Y%m%d")

          forecast_res = query_server(:forecasts, team: team, date: date)
          forecasts = forecast_res["forecasts"]
          forecasts.each do |forecast_data|
            forecast = Forecast.find_or_create_by(season: @season, game: game)
            forecast.update(forecast_data)
          end
        end
      end
    end
  end
end
