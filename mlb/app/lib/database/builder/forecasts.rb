module Database
  module Builder
    class Forecasts < Base
      DATETIME_FORMAT = '%Y-%m-%d %H:%M'.freeze
      def needs_data?(_game)
        true
      end

      def build
        dates = [Date.tomorrow]
        dates.each do |date|
          puts "Building Forecasts for Date #{date}"
          @season.games.where(date: date).each do |game|
            puts "Game #{game.id} missing time" unless game.datetime
            next unless needs_data?(game) && game.datetime

            query_forecasts(game)
          end
        end
      end

      def query_forecasts(game)
        puts "Building Forecasts for Game #{game.id}"
        # hour is for caching each query by hour queried in mongodb
        game_time = game.datetime.strftime(DATETIME_FORMAT)
        hour = Time.now.hour
        query_params = {
          team: game.home_team.abbr, game_time: game_time, hour: hour
        }
        forecasts_res = query_server(:forecasts, query_params)
        query = build_forecast_query(forecasts_res, game, hour)
        build_forecasts(forecasts_res, query, game)
      end

      def build_forecast_query(forecast_res, game, hour)
        query_time = DateTime.parse(forecast_res['query_time'])
        ForecastQuery.find_or_create_by(datetime: query_time, game: game, hour: hour)
      end

      def build_forecasts(forecasts_res, query, game)
        forecasts = forecasts_res['forecasts']
        zone = ActiveSupport::TimeZone.new(game.home_team.timezone)
        forecasts.each do |forecast|
          datetime = zone.parse("#{forecast.delete('date')} #{forecast.delete('hour')}")
          forecast_model = Forecast.find_or_create_by(forecast_query: query, datetime: datetime)
          forecast_model.update(forecast)
        end
      end
    end
  end
end
