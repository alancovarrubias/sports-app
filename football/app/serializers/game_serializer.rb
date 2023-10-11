class GameSerializer
  include JSONAPI::Serializer
  STATS = %i[away_full_game_stat home_full_game_stat away_first_half_stat home_first_half_stat].freeze
  LINES = %i[full_game_line].freeze
  EMPTY = { data: { attributes: {} } }.freeze

  attributes :id,
             :date,
             :away_team,
             :home_team,
             :start_time,
             :game_clock,
             :kicked

  LINES.each do |attr|
    attribute attr do |object|
      data = object.send(attr)
      data ? LineSerializer.new(data) : EMPTY
    end
  end

  STATS.each do |attr|
    attribute attr do |object|
      data = object.send(attr)
      data ? StatSerializer.new(data) : EMPTY
    end
  end
end
