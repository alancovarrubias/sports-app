class ForecastSerializer
  include JSONAPI::Serializer
  attributes :id, :local_time, :conditions, :temp, :dew, :humidity, :wind, :pressure
end
