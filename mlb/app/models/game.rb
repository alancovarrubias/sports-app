class Game < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :batting_stats, as: :interval
  has_many :pitching_stats, as: :interval
  has_many :teams, through: :team_pitching_stats, source: :model, source_type: 'Team'
  has_many :pitchers, through: :pitching_stats, source: :model, source_type: 'Player'
  has_many :batters, through: :batting_stats, source: :model, source_type: 'Player'
  has_many :lines
  has_many :preds
  scope :with_season, -> { includes(:season) }
  scope :with_team_stats, -> { includes(:away_team, :home_team, :batting_stats, :pitching_stats) }
  scope :with_player_stats, -> { includes(:batters, :pitchers, batting_stats: [:model], pitching_stats: [:model]) }
  scope :with_lines, -> { includes(:lines) }
  scope :with_preds, -> { includes(:preds) }

  def players
    (pitchers + batters).uniq
  end

  %i[away home].each do |side|
    define_method("#{side}_players") { (send("#{side}_pitchers") + send("#{side}_batters")).uniq }
    define_method("#{side}_pitchers") { pitchers.where(team: send("#{side}_team")) }
    define_method("#{side}_batters") { batters.where(team: send("#{side}_team")) }
    define_method("#{side}_team_pitching_stats") do
      team_pitching_stats.select do |stat|
        stat.model_id == send("#{side}_team_id")
      end
    end
    define_method("#{side}_team_batting_stats") do
      team_batting_stats.select do |stat|
        stat.model_id == send("#{side}_team_id")
      end
    end
    define_method("#{side}_player_pitching_stats") do
      player_pitching_stats.select do |stat|
        stat.model.team_id == send("#{side}_team_id")
      end
    end
    define_method("#{side}_player_batting_stats") do
      player_batting_stats.select do |stat|
        stat.model.team_id == send("#{side}_team_id")
      end
    end
  end

  def url
    format_options = { year: date.year, month: date.month, day: date.day, home_team: home_team.link, num: num }
    format('%<home_team>s%<year>d%<month>02d%<day>02d%<num>d', format_options)
  end
end
