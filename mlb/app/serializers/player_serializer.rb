class PlayerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :abbr, :position
  belongs_to :season, lazy_load_data: true, links: {
    related: lambda { |object|
      "/seasons/#{object.season_id}"
    }
  }
  belongs_to :team, lazy_load_data: true, links: {
    related: lambda { |object|
      "/teams/#{object.team_id}"
    }
  }
end
