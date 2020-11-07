class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :away_team do |obj|
    away_team_stat = obj.team_stats.select { |stat| stat.model_id == obj.away_team_id }.first
    {
      name: obj.away_team.name,
      stat: away_team_stat ? away_team_stat.attributes : {}
    }
  end
  attribute :home_team do |obj|
    home_team_stat = obj.team_stats.select { |stat| stat.model_id == obj.home_team_id }.first
    {
      name: obj.home_team.name,
      stat: home_team_stat ? home_team_stat.attributes : {}
    }
  end
end
