class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :time do |obj|
    obj.time ? obj.time.strftime('%H:%M') : ''
  end
  attribute :away_team, if: proc { |_record, params| params[:team] } do |obj|
    team = obj.away_team
    batting_stat = obj.batting_stats.select { |stat| stat.model_id == team.id && stat.model_type == 'Team' }.first
    pitching_stat = obj.pitching_stats.select { |stat| stat.model_id == team.id && stat.model_type == 'Team' }.first
    {
      id: team.id,
      name: team.name,
      stat: {
        batting: batting_stat ? batting_stat.attributes : nil,
        pitching: pitching_stat ? pitching_stat.attributes : nil
      }
    }
  end
  attribute :home_team, if: proc { |_record, params| params[:team] } do |obj|
    team = obj.home_team
    batting_stat = obj.batting_stats.select { |stat| stat.model_id == team.id && stat.model_type == 'Team' }.first
    pitching_stat = obj.pitching_stats.select { |stat| stat.model_id == team.id && stat.model_type == 'Team' }.first
    {
      id: team.id,
      name: team.name,
      stat: {
        batting: batting_stat ? batting_stat.attributes : nil,
        pitching: pitching_stat ? pitching_stat.attributes : nil
      }
    }
  end
  attribute :away_players, if: proc { |_record, params| params[:player] } do |obj|
    batting_stats = obj.batting_stats.select { |stat| stat.model_type == 'Player' }
    pitching_stats = obj.pitching_stats.select { |stat| stat.model_type == 'Player' }
    obj.players.select { |player| player.team_id == obj.away_team_id }.map do |team_player|
      batting_stat = batting_stats.find { |stat| stat.model_id == team_player.id }
      pitching_stat = pitching_stats.find { |stat| stat.model_id == team_player.id }
      {
        id: team_player.id,
        name: team_player.name,
        stat: {
          batting: batting_stat ? batting_stat.attributes : nil,
          pitching: pitching_stat ? pitching_stat.attributes : nil
        }
      }
    end
  end
  attribute :home_players, if: proc { |_record, params| params[:player] } do |obj|
    batting_stats = obj.batting_stats.select { |stat| stat.model_type == 'Player' }
    pitching_stats = obj.pitching_stats.select { |stat| stat.model_type == 'Player' }
    obj.players.select { |player| player.team_id == obj.home_team_id }.map do |team_player|
      batting_stat = batting_stats.find { |stat| stat.model_id == team_player.id }
      pitching_stat = pitching_stats.find { |stat| stat.model_id == team_player.id }
      {
        id: team_player.id,
        name: team_player.name,
        stat: {
          batting: batting_stat ? batting_stat.attributes : nil,
          pitching: pitching_stat ? pitching_stat.attributes : nil
        }
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
