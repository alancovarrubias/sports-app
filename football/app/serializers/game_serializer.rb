class GameSerializer
  include JSONAPI::Serializer
  STATS = %i[away_full_game_stat home_full_game_stat away_first_half_stat home_first_half_stat].freeze
  attributes :id,
             :date,
             :away_team,
             :home_team,
             :start_time,
             :game_clock,
             :kicking_team

  Line.books.each_key do |book|
    attribute "full_game_#{book}" do |object|
      line = object.send("full_game_#{book}")
      "#{object.home_team.name} #{line.spread} and #{line.total}" if line
    end
  end

  STATS.each do |attr|
    attribute attr do |object|
      data = object.send(attr)
      StatSerializer.new(data) if data
    end
  end
end
