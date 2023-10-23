class GameSerializer
  include JSONAPI::Serializer
  STATS = %i[away_full_game_stat home_full_game_stat away_first_half_stat home_first_half_stat].freeze
  attributes :id,
             :date,
             :away_team,
             :home_team,
             :start_time,
             :game_clock,
             :kicked
  STATS.each do |attr|
    attribute attr do |object|
      data = object.send(attr)
      if data
        StatSerializer.new(data)
      else
        { data: { attributes: {} } }
      end
    end
  end
end
