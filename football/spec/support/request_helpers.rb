# spec/support/request_helpers.rb
module RequestHelpers
  def body
    JSON.parse(response.body)
  end

  def build_season_hash(season)
    {
      'id' => season.id.to_s,
      'type' => 'season',
      'attributes' => {
        'id' => season.id,
        'year' => season.year
      }
    }
  end

  def build_team_hash(team)
    { 'id' => team.id,
      'name' => team.name,
      'abbr' => team.abbr,
      'league' => team.league,
      'season_id' => team.season.id }
  end

  def build_game_hash(game)
    {
      'id' => game.id.to_s,
      'type' => 'game',
      'attributes' => {
        'id' => game.id,
        'date' => game.date.to_s,
        'away_team' => build_team_hash(game.away_team),
        'home_team' => build_team_hash(game.home_team)
      }
    }
  end
end
