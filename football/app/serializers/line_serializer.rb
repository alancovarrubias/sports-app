class LineSerializer
  include JSONAPI::Serializer
  attributes :id, :spread, :total
end
