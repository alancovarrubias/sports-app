class StatSerializer
  include JSONAPI::Serializer
  attributes :id,
             :attempts,
             :completions,
             :passing_yards,
             :carries,
             :rushing_yards,
             :longest_rush,
             :longest_pass,
             :score,
             :total_plays,
             :total_yards,
             :ave_per_car,
             :ave_per_att,
             :ave_per_play
end
