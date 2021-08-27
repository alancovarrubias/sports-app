module Database
  module Builder
    class Forecasts < Base
      DATETIME_FORMAT = '%Y-%m-%d %H:%M'.freeze
      def needs_data?(game, hour)
        game.forecast_queries.where(hour: hour).empty?
      end

      def build
        now = DateTime.now
        puts "Building Forecasts for time #{now}"
        @season.games.where('datetime > ? AND datetime < ?', now, now + 2).each do |game|
          hour = Time.now.hour
          next unless needs_data?(game, hour)

          query_forecasts(game, hour)
        end
      end

      def query_forecasts(game, hour)
        puts "Building Forecasts for Game #{game.id}"
        # hour is for caching each query by hour queried in mongodb
        zone = ActiveSupport::TimeZone.new(game.home_team.timezone)
        game_time = game.datetime.in_time_zone(zone).strftime(DATETIME_FORMAT)
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
