class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :date, :away_team_id, :home_team_id

  belongs_to :season, lazy_load_data: true, links: {
    related: lambda { |object|
      "/seasons/#{object.season_id}"
    }
  }
  belongs_to :away_team, lazy_load_data: true, links: {
    related: lambda { |object|
      "/games/#{object.id}/away_team"
    }
  }
  belongs_to :home_team, lazy_load_data: true, links: {
    related: lambda { |object|
      "/games/#{object.id}/home_team"
    }
  }
  has_many :away_players, lazy_load_data: true, links: {
    related: lambda { |object|
      "/games/#{object.id}/away_players"
    }
  }
  has_many :home_players, lazy_load_data: true, links: {
    related: lambda { |object|
      "/games/#{object.id}/home_players"
    }
  }
end
