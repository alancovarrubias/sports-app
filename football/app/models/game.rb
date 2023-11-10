class Game < ApplicationRecord
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats, dependent: :destroy
  has_many :lines, dependent: :destroy
  scope :with_season, -> { includes(:season) }
  scope :with_stats, -> { includes(:away_team, :home_team, :stats, :lines) }
  scope :on_date, ->(date) { where(date: date) }
  scope :earliest_start_time_first, -> { order(start_time: :asc) }
  scope :last_updated_first, -> { order(updated_at: :asc) }

  VENUES = %i[away home].freeze
  enum kicked: VENUES
  VENUES.product(Stat.intervals.keys).each do |venue, interval|
    define_method("#{venue}_#{interval}_stat") do
      stats.find { |stat| stat.interval == interval && stat.team_id == send("#{venue}_team_id") }
    end
  end

  Line.books.each_key do |book|
    define_method("full_game_#{book}") do
      lines.find { |line| line.interval == 'full_game' && line.book == book }
    end
  end

  def finished?
    game_clock&.include?('Final')
  end

  def not_started?
    DateTime.now < start_time
  end

  def recently_second_half?
    game_clock == 'Second Half' && DateTime.now < start_time + 6.hours
  end
end
