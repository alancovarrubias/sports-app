class SeasonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :year
  has_many :games, lazy_load_data: true, links: {
    related: lambda { |object|
      "/seasons/#{object.id}/games"
    }
  }
end
