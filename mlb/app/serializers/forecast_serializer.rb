class ForecastSerializer
  DATETIME_FORMAT = '%Y-%m-%d %I:%M%p'.freeze
  include JSONAPI::Serializer
  attributes :id, :hour, :conditions, :temp, :dew, :humidity, :wind, :pressure
  attribute :local_time do |obj|
    obj.local_time.strftime(DATETIME_FORMAT)
  end
end
