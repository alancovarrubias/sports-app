class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :time do |obj|
    obj.time ? obj.time.strftime('%H:%M') : ''
  end
  attribute :away_team, if: proc { |_record, params| params[:team] } do |obj|
    team = obj.away_team
    batting_stat = obj.team_batting_stats.select { |stat| stat.model_id == team.id }.first
    pitching_stat = obj.team_pitching_stats.select { |stat| stat.model_id == team.id }.first
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
    batting_stat = obj.team_batting_stats.select { |stat| stat.model_id == team.id }.first
    pitching_stat = obj.team_pitching_stats.select { |stat| stat.model_id == team.id }.first
    {
      id: team.id,
      name: team.name,
      stat: {
        batting: batting_stat ? batting_stat.attributes : nil,
        pitching: pitching_stat ? pitching_stat.attributes : nil
      }
    }
  end
  attribute :away_starter, if: proc { |_record, params| params[:team] } do |obj|
    away_starter = obj.away_starter
    {
      id: away_starter.id,
      name: away_starter.name
    }
  end
  attribute :home_starter, if: proc { |_record, params| params[:team] } do |obj|
    home_starter = obj.home_starter
    {
      id: home_starter.id,
      name: home_starter.name
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
          batting: batting_stat ? batting_stat.attributes : nil,
          pitching: pitching_stat ? pitching_stat.attributes : nil
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
          batting: batting_stat ? batting_stat.attributes : nil,
          pitching: pitching_stat ? pitching_stat.attributes : nil
        }
      }
    end
  end
end
