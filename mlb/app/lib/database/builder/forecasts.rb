module Database
  module Builder
    class Forecasts < Base
      DATETIME_FORMAT = '%Y-%m-%d %H:%M'.freeze
      def needs_data?(_game)
        true
      end

      def build
        dates = [Date.yesterday]
        dates.each do |date|
          puts "Building Forecasts for Date #{date}"
          @season.games.where(date: date).each do |game|
            puts "Game #{game.id} missing time" unless game.local_time
            next unless needs_data?(game) && game.local_time

            query_forecasts(game)
          end
        end
      end

      def query_forecasts(game)
        puts "Building Forecasts for Game #{game.id}"
        # hour is for caching each query by hour queried in mongodb
        game_time = "#{game.date} #{game.local_time.strftime('%H:%M')}"
        hour = Time.now.hour
        query_params = {
          team: game.home_team.abbr, game_time: game_time, hour: hour
        }
        forecasts_res = query_server(:forecasts, query_params)
        query = build_forecast_query(forecasts_res, game, hour)
        build_forecasts(forecasts_res, query)
      end

      def build_forecast_query(forecast_res, game, hour)
        query_time = Time.strptime(forecast_res['query_time'], DATETIME_FORMAT)
        ForecastQuery.find_or_create_by(time: query_time, game: game, hour: hour)
      end

      def build_forecasts(forecasts_res, query)
        forecasts = forecasts_res['forecasts']
        forecasts.each do |forecast|
          forecast_model = Forecast.find_or_create_by(forecast_query: query, hour: forecast['hour'])
          forecast['local_time'] = Time.strptime(forecast['local_time'], DATETIME_FORMAT)
          forecast_model.update(forecast)
        end
      end
    end
  end
end
