class ForecastSerializer
  DATETIME_FORMAT = '%Y-%m-%d %I:%M%p'.freeze
  include JSONAPI::Serializer
  attributes :id, :conditions, :temp, :dew, :humidity, :wind, :pressure
  attribute :datetime do |obj|
    obj.datetime.strftime(DATETIME_FORMAT)
  end
end
