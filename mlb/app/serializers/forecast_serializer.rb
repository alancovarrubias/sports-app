class ForecastSerializer
  include JSONAPI::Serializer
  attributes :id, :local_time, :hour, :conditions, :temp, :dew, :humidity, :wind, :pressure
end
