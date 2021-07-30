class ForecastSerializer
  include JSONAPI::Serializer
  attributes :id, :time, :conditions
end
