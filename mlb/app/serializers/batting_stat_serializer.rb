class BattingStatSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :model_id, :model_type
  attributes :ab, :r, :h, :rbi, :bb, :so, :pa, :ba, :obp, :slg, :ops

  belongs_to :season, lazy_load_data: true, links: {
    related: lambda { |object|
      "/seasons/#{object.season_id}"
    }
  }
  belongs_to :game, lazy_load_data: true, links: {
    related: lambda { |object|
      "/games/#{object.game_id}"
    }
  }
  belongs_to :model, lazy_load_data: true, links: {
    related: lambda { |object|
      "/#{object.model_type.downcase}s/#{object.model_id}"
    }
  }
end
