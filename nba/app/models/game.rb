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
  has_many :lines
  scope :with_team_stats, -> { includes(:away_team, :home_team, :team_stats) }
  scope :with_player_stats, -> { includes(player_stats: [:model]) }

  %i[away home].each do |side|
    define_method("#{side}_players") { players.select { |player| player.team_id === send("#{side}_team_id") } }
    define_method("#{side}_team_stats") { team_stats.select { |stat| stat.model_id === send("#{side}_team_id") } }
    define_method("#{side}_player_stats") { player_stats.select { |stat| stat.model.team_id === send("#{side}_team_id") } }
  end

  def url
    format_options = { year: date.year, month: date.month, day: date.day, home_team: home_team.abbr }
    format('%<year>d%<month>02d%<day>02d0%<home_team>s', format_options)
  end
end
