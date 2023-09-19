class GameSerializer
  include JSONAPI::Serializer
  attributes :id,
             :date,
             :away_team,
             :home_team,
             :away_full_game_stat,
             :home_full_game_stat,
             :start_time
end
