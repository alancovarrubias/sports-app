class BattingStatSerializer
  include JSONAPI::Serializer
  attributes :id, :model_id, :model_type
  attributes :ab, :r, :h, :rbi, :bb, :so, :pa, :ba, :obp, :slg, :ops
end
