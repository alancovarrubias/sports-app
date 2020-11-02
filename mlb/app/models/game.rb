class Game < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :batting_stats
  has_many :pitching_stats
  has_many :team_pitching_stats, -> { team_stats }, class_name: 'PitchingStat'
  has_many :player_pitching_stats, -> { player_stats }, class_name: 'PitchingStat'
  has_many :team_batting_stats, -> { team_stats }, class_name: 'BattingStat'
  has_many :player_batting_stats, -> { player_stats }, class_name: 'BattingStat'
  has_many :teams, through: :team_pitching_stats, source: :model, source_type: 'Team'
  has_many :pitchers, through: :player_pitching_stats, source: :model, source_type: 'Player'
  has_many :batters, through: :player_batting_stats, source: :model, source_type: 'Player'

  def players
    (pitchers + batters).uniq
  end

  %i[away home].each do |side|
    define_method("#{side}_players") { (send("#{side}_pitchers") + send("#{side}_batters")).uniq }
    define_method("#{side}_pitchers") { pitchers.where(team: send("#{side}_team")) }
    define_method("#{side}_batters") { batters.where(team: send("#{side}_team")) }
    define_method("#{side}_team_pitching_stats") do
      team_pitching_stats.where(model: send("#{side}_team"), model_type: :Team)
    end
    define_method("#{side}_team_batting_stats") do
      team_batting_stats.where(model: send("#{side}_team"), model_type: :Team)
    end
    define_method("#{side}_player_pitching_stats") do
      player_pitching_stats.where(model: send("#{side}_players"), model_type: :Player)
    end
    define_method("#{side}_player_batting_stats") do
      player_batting_stats.where(model: send("#{side}_players"), model_type: :Player)
    end
  end

  def url
    format_options = { year: date.year, month: date.month, day: date.day, home_team: home_team.link }
    format('%<home_team>s%<year>d%<month>02d%<day>02d0', format_options)
  end
end
