class Game < ApplicationRecord
  TEAM_ASSOCIATIONS = %w[away_team home_team kicking_team].freeze
  DERIVED_ATTRIBUTES = %w[
    away_full_game_stat
    home_full_game_stat
    away_first_half_stat
    home_first_half_stat
  ].freeze
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  belongs_to :kicking_team, class_name: 'Team', optional: true
  has_many :stats, dependent: :destroy
  has_many :lines, dependent: :destroy
  scope :started, -> { where('start_time <= ?', DateTime.now) }
  scope :not_started, -> { where('start_time > ?', DateTime.now) }

  GAME_CLOCKS.each do |name, value|
    define_method("#{name}?") do
      game_clock.include?(value)
    end
  end

  VENUES.product(INTERVALS).each do |venue, interval|
    define_method("#{venue}_#{interval}_stat") do
      stats.find { |stat| stat.interval == interval.to_s && stat.team_id == send("#{venue}_team_id") }
    end
  end

  INTERVALS.product(BOOKS).each do |interval, book|
    define_method("#{interval}_#{book}") do
      lines.find { |line| line.interval == interval.to_s && line.book == book }
    end
  end

  def enqueued?
    return false unless enqueued_at
    return true unless calculated_at

    enqueued_at > calculated_at
  end

  def as_json(options = {})
    super(options.merge(include: TEAM_ASSOCIATIONS)).merge(
      DERIVED_ATTRIBUTES.index_with { |attr| send(attr) || {} }
    )
  end
end
