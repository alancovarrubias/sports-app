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

  attribute :full_game_line do |object|
    line = object.full_game_line
    "#{object.home_team.name} #{line.spread} and #{line.total}" if line
  end

  STATS.each do |attr|
    attribute attr do |object|
      data = object.send(attr)
      data ? StatSerializer.new(data) : EMPTY
    end
  end
end
