class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date, :away_team, :home_team
end
