module Database
  module Builder
    class Forecasts < Base
      def needs_data?(game)
        game.forecasts.empty?
      end


      def build
        dates = [Date.today, Date.tomorrow]
        dates.each do |date|
          puts "Building Forecasts for Date #{date}"
          @season.games.where(date: date).each do |game|
            next unless needs_data?(game)
  
            puts "Building Forecasts for Game #{game.id}"
            forecast_res = query_server(:forecasts, team: game.home_team.abbr, date: game.date)
            forecasts = forecast_res["forecasts"]
            forecasts.each do |forecast_data|
              forecast = Forecast.find_or_create_by(season: @season, game: game, time: forecast_data["time"])
              forecast.update(forecast_data)
            end
          end
        end
      end
    end
  end
end
