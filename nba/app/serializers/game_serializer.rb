class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :year do |game|
    game.season.year
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
  attribute :lines, if: proc { |_record, params| params[:line] } do |game|
    game.lines.map do |line|
      {
        bookie: line.bookie,
        total: line.total,
        spread: line.spread
      }
    end
  end
  attribute :preds, if: proc { |_record, params| params[:pred] } do |game|
    game.preds.map do |line|
      {
        desc: line.desc,
        away_score: line.away_score,
        home_score: line.home_score
      }
    end
  end
end
