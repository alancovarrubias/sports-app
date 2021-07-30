class ForecastSerializer
  include JSONAPI::Serializer
  attributes :id, :time, :conditions, :temp, :dew, :humidity, :wind, :pressure
end
