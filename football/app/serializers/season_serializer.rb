class SeasonSerializer
  include JSONAPI::Serializer
  attributes :id, :year
end
