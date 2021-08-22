class ForecastQuerySerializer
  include JSONAPI::Serializer
  attributes :hour, :time
  attributes :forecasts do |obj|
    ForecastSerializer.new(obj.forecasts).serializable_hash
  end
end
