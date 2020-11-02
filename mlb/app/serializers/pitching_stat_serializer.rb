class PitchingStatSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :model_id, :model_type
  attributes :ip, :h, :r, :er, :bb, :so, :hr, :era

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
