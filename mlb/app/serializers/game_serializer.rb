class GameSerializer
  include JSONAPI::Serializer
  attributes :id, :date
  attribute :datetime do |obj|
    obj.datetime ? obj.datetime.strftime('%H:%M') : ''
  end
  attribute :away_team, if: proc { |_record, params| params[:team] } do |obj|
    team = obj.away_team
    batting_stat = obj.away_team_batting_stats.first
    pitching_stat = obj.away_team_pitching_stats.first
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
    batting_stat = obj.home_team_batting_stats.first
    pitching_stat = obj.home_team_pitching_stats.first
    {
      id: team.id,
      name: team.name,
      stat: {
        batting: batting_stat ? batting_stat.attributes : nil,
        pitching: pitching_stat ? pitching_stat.attributes : nil
      }
    }
  end
=begin
  attribute :away_starter, if: proc { |_record, params| params[:team] } do |obj|
    away_starter = obj.away_starter
    {
      id: away_starter.id,
      name: away_starter.name,
      season_stats: away_starter.season_stats
    }
  end
  attribute :home_starter, if: proc { |_record, params| params[:team] } do |obj|
    home_starter = obj.home_starter
    {
      id: home_starter.id,
      name: home_starter.name,
      season_stats: home_starter.season_stats
    }
  end
  attribute :away_players, if: proc { |_record, params| params[:player] } do |obj|
    batting_stats = obj.away_player_batting_stats
    pitching_stats = obj.away_player_pitching_stats
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
    batting_stats = obj.home_player_batting_stats
    pitching_stats = obj.home_player_pitching_stats
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
=end
end
