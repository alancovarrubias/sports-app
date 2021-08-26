class ForecastSerializer
  DATETIME_FORMAT = '%Y-%m-%d %I:%M%p'.freeze
  include JSONAPI::Serializer
  attributes :id, :conditions, :temp, :dew, :humidity, :wind, :pressure
  attribute :datetime do |obj|
    zone = ActiveSupport::TimeZone.new(obj.forecast_query.game.home_team.timezone)
    obj.datetime.in_time_zone(zone).strftime(DATETIME_FORMAT)
  end
end
