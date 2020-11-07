class StatSerializer
  include JSONAPI::Serializer
  attributes :id, :model_type
  attributes :sp, :fg, :fga, :fg3, :fg3a, :ft, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts, :ortg, :drtg
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
