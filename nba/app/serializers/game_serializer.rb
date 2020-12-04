class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :away_team, if: proc { |_record, params| params[:team] } do |obj|
    away_team_stat = obj.team_stats.select { |stat| stat.model_id == obj.away_team_id }.first
    team = obj.home_team
    {
      id: team.id,
      name: team.name,
      stat: away_team_stat ? away_team_stat.attributes : Stat.new.attributes
    }
  end
  attribute :home_team, if: proc { |_record, params| params[:team] } do |obj|
    home_team_stat = obj.team_stats.select { |stat| stat.model_id == obj.home_team_id }.first
    team = obj.home_team
    {
      id: team.id,
      name: team.name,
      stat: home_team_stat ? home_team_stat.attributes : Stat.new.attributes
    }
  end
  attribute :away_players, if: proc { |_record, params| params[:player] } do |obj|
    obj.player_stats.includes(:model).select { |stat| stat.model.team_id == obj.away_team_id }.map do |player_stat|
      player = player_stat.model
      {
        id: player.id,
        name: player.name,
        stat: player_stat.attributes
      }
    end
  end
  attribute :home_players, if: proc { |_record, params| params[:player] } do |obj|
    obj.player_stats.includes(:model).select { |stat| stat.model.team_id == obj.home_team_id }.map do |player_stat|
      player = player_stat.model
      {
        id: player.id,
        name: player.name,
        stat: player_stat.attributes
      }
    end
  end
end
