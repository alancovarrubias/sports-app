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
      'season_id' => team.season.id }
  end

  def build_stat_hash(stat)
    {
      'data' => {
        'id' => stat.id.to_s,
        'type' => 'stat',
        'attributes' => {
          'id' => stat.id,
          'attempts' => stat.attempts,
          'completions' => stat.completions,
          'passing_yards' => stat.passing_yards,
          'carries' => stat.carries,
          'rushing_yards' => stat.rushing_yards,
          'longest_rush' => stat.longest_rush,
          'longest_pass' => stat.longest_pass,
          'score' => stat.score,
          'total_plays' => stat.total_plays,
          'total_yards' => stat.total_yards,
          'ave_per_car' => stat.ave_per_car,
          'ave_per_att' => stat.ave_per_att,
          'ave_per_play' => stat.ave_per_play,
          'typa' => stat.typa,
          'typai' => stat.typai,
          'typc' => stat.typc,
          'typp' => stat.typp
        }
      }
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
        'game_clock' => game.game_clock,
        'kicked' => game.kicked,
        'away_team' => build_team_hash(game.away_team),
        'home_team' => build_team_hash(game.home_team),
        'away_full_game_stat' => build_stat_hash(game.away_full_game_stat),
        'home_full_game_stat' => build_stat_hash(game.home_full_game_stat)
      }
    }
  end
end
