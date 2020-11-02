class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :abbr, :city
  belongs_to :season, lazy_load_data: true, links: {
    related: lambda { |object|
      "/seasons/#{object.season_id}"
    }
  }
  has_many :players, lazy_load_data: true, links: {
    related: lambda { |object|
      "/teams/#{object.id}/players"
    }
  }
end
