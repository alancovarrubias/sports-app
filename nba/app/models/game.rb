class Game < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats
  has_many :team_stats, -> { team_stats }, class_name: 'Stat'
  has_many :player_stats, -> { player_stats }, class_name: 'Stat'
  has_many :teams, through: :team_stats, source: :model, source_type: 'Team'
  has_many :players, through: :player_stats, source: :model, source_type: 'Player'

  %i[away home].each do |side|
    define_method("#{side}_players") { players.where(team: send("#{side}_team")) }
    define_method("#{side}_team_stats") { team_stats.where(model: send("#{side}_team")) }
    define_method("#{side}_player_stats") { player_stats.where(model: send("#{side}_players")) }
  end

  def url
    format_options = { year: date.year, month: date.month, day: date.day, home_team: home_team.abbr }
    format('%<year>d%<month>02d%<day>02d0%<home_team>s', format_options)
  end
end
