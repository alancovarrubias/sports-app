class PitchingStatSerializer
  include JSONAPI::Serializer
  attributes :id, :model_id, :model_type
  attributes :ip, :h, :r, :er, :bb, :so, :hr, :era
end
