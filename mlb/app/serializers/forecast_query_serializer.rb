class ForecastQuerySerializer
  DATETIME_FORMAT = '%Y-%m-%d %I:%M%p'.freeze
  include JSONAPI::Serializer
  attributes :id, :hour
  attribute :datetime do |obj|
    zone = ActiveSupport::TimeZone.new('Pacific Time (US & Canada)')
    obj.datetime.in_time_zone(zone).strftime(DATETIME_FORMAT)
  end
  attributes :forecasts do |obj|
    ForecastSerializer.new(obj.forecasts).serializable_hash
  end
end
