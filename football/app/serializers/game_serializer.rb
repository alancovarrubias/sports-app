class GameSerializer
  include JSONAPI::Serializer
  attributes :id,
             :date,
             :away_team,
             :home_team,
             :start_time,
             :game_clock,
             :kicked
  attribute :away_full_game_stat do |object|
    StatSerializer.new(object.away_full_game_stat)
  end
  attribute :home_full_game_stat do |object|
    StatSerializer.new(object.home_full_game_stat)
  end
  attribute :away_first_half_stat do |object|
    StatSerializer.new(object.away_first_half_stat)
  end
  attribute :home_first_half_stat do |object|
    StatSerializer.new(object.home_first_half_stat)
  end
end
