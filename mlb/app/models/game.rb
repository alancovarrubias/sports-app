class Game < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_one :self_ref, class_name: 'Game', foreign_key: :id
  has_many :batting_stats, as: :interval, dependent: :destroy
  has_many :team_batting_stats, -> { where(model_type: 'Team') }, through: :self_ref, source: :batting_stats
  has_many :away_team_batting_stats, ->(game) { where(model_id: game.away_team_id) }, through: :self_ref, source: :team_batting_stats
  has_many :home_team_batting_stats, ->(game) { where(model_id: game.home_team_id) }, through: :self_ref, source: :team_batting_stats
  has_many :player_batting_stats, -> { where(model_type: 'Player') }, through: :self_ref, source: :batting_stats
  has_many :away_player_batting_stats, ->(game) { where(model: { team_id: game.away_team_id })}, through: :self_ref, source: :player_batting_stats
  has_many :home_player_batting_stats, ->(game) { where(model: { team_id: game.home_team_id }) }, through: :self_ref, source: :player_batting_stats
  has_many :pitching_stats, as: :interval, dependent: :destroy
  has_many :team_pitching_stats, -> { where(model_type: 'Team') }, through: :self_ref, source: :pitching_stats
  has_many :away_team_pitching_stats, ->(game) { where(model_id: game.away_team_id) }, through: :self_ref, source: :team_pitching_stats
  has_many :home_team_pitching_stats, ->(game) { where(model_id: game.home_team_id) }, through: :self_ref, source: :team_pitching_stats
  has_many :player_pitching_stats, -> { where(model_type: 'Player') }, through: :self_ref, source: :pitching_stats
  has_many :away_player_pitching_stats, ->(game) { where(model: { team_id: game.away_team_id })}, through: :self_ref, source: :player_pitching_stats
  has_many :home_player_pitching_stats, ->(game) { where(model: { team_id: game.home_team_id }) }, through: :self_ref, source: :player_pitching_stats
  has_many :pitchers, through: :pitching_stats, source: :model, source_type: 'Player'
  has_many :batters, through: :batting_stats, source: :model, source_type: 'Player'
  has_many :lines
  has_many :preds
  scope :with_season, -> { includes(:season) }
  scope :with_team_stats, -> { includes(:away_team, :home_team, :team_batting_stats, :team_pitching_stats) }
  scope :with_player_stats, -> { includes(:batters, :pitchers, player_batting_stats: [:model], player_pitching_stats: [:model]) }
  scope :with_lines, -> { includes(:lines) }
  scope :with_preds, -> { includes(:preds) }

  def players
    (pitchers + batters).uniq
  end

  %i[away home].each do |side|
    define_method("#{side}_starter") { pitchers.select { |player| player.team_id == send("#{side}_team_id") }.first }
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
