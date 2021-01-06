class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :lines, if: proc { |_record, params| params[:line] } do |game|
    game.lines.map do |line|
      {
        total: line.total,
        spread: line.spread,
        bookie: line.bookie
      }
    end
  end
  attribute :away_team, if: proc { |_record, params| params[:team] } do |game|
    stat = game.away_team_stats.first
    team = game.away_team
    {
      id: team.id,
      name: team.name,
      stat: stat ? stat.attributes : Stat.new.attributes
    }
  end
  attribute :home_team, if: proc { |_record, params| params[:team] } do |game|
    stat = game.home_team_stats.first
    team = game.home_team
    {
      id: team.id,
      name: team.name,
      stat: stat ? stat.attributes : Stat.new.attributes
    }
  end
  attribute :away_players, if: proc { |_record, params| params[:player] } do |game|
    game.away_player_stats.map do |stat|
      player = stat.model
      {
        id: player.id,
        name: player.name,
        stat: stat.attributes
      }
    end
  end
  attribute :home_players, if: proc { |_record, params| params[:player] } do |game|
    game.home_player_stats.map do |stat|
      player = stat.model
      {
        id: player.id,
        name: player.name,
        stat: stat.attributes
      }
    end
  end
end
