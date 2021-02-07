class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :year do |game|
    game.season.year
  end
  attribute :away_team, if: proc { |_record, params| params[:team] } do |obj|
    team = obj.away_team
    batting_stat = obj.team_batting_stats.select { |stat| stat.model_id == team.id }.first
    pitching_stat = obj.team_pitching_stats.select { |stat| stat.model_id == team.id }.first
    {
      id: team.id,
      name: team.name,
      stat: {
        batting: batting_stat ? batting_stat.attributes : BattingStat.new.attributes,
        pitching: pitching_stat ? pitching_stat.attributes : PitchingStat.new.attributes
      }
    }
  end
  attribute :home_team, if: proc { |_record, params| params[:team] } do |obj|
    team = obj.home_team
    batting_stat = obj.team_batting_stats.select { |stat| stat.model_id == team.id }.first
    pitching_stat = obj.team_pitching_stats.select { |stat| stat.model_id == team.id }.first
    {
      id: team.id,
      name: team.name,
      stat: {
        batting: batting_stat ? batting_stat.attributes : BattingStat.new.attributes,
        pitching: pitching_stat ? pitching_stat.attributes : PitchingStat.new.attributes
      }
    }
  end
  attribute :away_players, if: proc { |_record, params| params[:player] } do |obj|
    batting_stats = obj.player_batting_stats
    pitching_stats = obj.player_pitching_stats
    obj.players.select { |player| player.team_id == obj.away_team_id }.map do |team_player|
      batting_stat = batting_stats.find { |stat| stat.model_id == team_player.id }
      pitching_stat = pitching_stats.find { |stat| stat.model_id == team_player.id }
      {
        id: team_player.id,
        name: team_player.name,
        stat: {
          batting: batting_stat ? batting_stat.attributes : BattingStat.new.attributes,
          pitching: pitching_stat ? pitching_stat.attributes : PitchingStat.new.attributes
        }
      }
    end
  end
  attribute :home_players, if: proc { |_record, params| params[:player] } do |obj|
    batting_stats = obj.player_batting_stats
    pitching_stats = obj.player_pitching_stats
    obj.players.select { |player| player.team_id == obj.home_team_id }.map do |team_player|
      batting_stat = batting_stats.find { |stat| stat.model_id == team_player.id }
      pitching_stat = pitching_stats.find { |stat| stat.model_id == team_player.id }
      {
        id: team_player.id,
        name: team_player.name,
        stat: {
          batting: batting_stat ? batting_stat.attributes : BattingStat.new.attributes,
          pitching: pitching_stat ? pitching_stat.attributes : PitchingStat.new.attributes
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
