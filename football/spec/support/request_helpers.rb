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

  def build_stat_hash(stat)
    {
      'id' => stat.id,
      'team_id' => stat.team_id,
      'game_id' => stat.game_id,
      'interval' => stat.interval,
      'attempts' => stat.attempts,
      'completions' => stat.completions,
      'passing_yards' => stat.passing_yards,
      'carries' => stat.carries,
      'rushing_yards' => stat.rushing_yards
    }
  end

  def build_game_hash(game)
    {
      'id' => game.id.to_s,
      'type' => 'game',
      'attributes' => {
        'id' => game.id,
        'date' => game.date.to_s,
        'start_time' => game.start_time.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
        'away_team' => build_team_hash(game.away_team),
        'home_team' => build_team_hash(game.home_team),
        'away_full_game_stat' => build_stat_hash(game.away_full_game_stat),
        'home_full_game_stat' => build_stat_hash(game.home_full_game_stat)
      }
    }
  end
end
