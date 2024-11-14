class Game < ApplicationRecord
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats, dependent: :destroy
  has_many :lines, dependent: :destroy
  VENUES = %i[away home].freeze
  enum kicked: VENUES
  scope :started, -> { where('start_time <= ?', DateTime.now) }
  scope :not_started, -> { where('start_time > ?', DateTime.now) }

  VENUES.product(Stat.intervals.keys).each do |venue, interval|
    define_singleton_method("#{venue}_#{interval}_stat") do
      stats.find { |stat| stat.interval == interval && stat.team_id == send("#{venue}_team_id") }
    end
  end

  Line.books.each_key do |book|
    define_method("full_game_#{book}") do
      lines.find { |line| line.interval == 'full_game' && line.book == book }
    end
  end

  def enqueued?
    return false unless enqueued_at
    return true unless calculated_at

    enqueued_at > calculated_at
  end

  def not_started?
    game_clock == 'Not Started' 
  end

  def halftime?
    game_clock == 'Halftime' 
  end

  def second_half?
    game_clock == 'Second Half' 
  end

  def finished?
    game_clock&.include?('Final')
  end

  def recently_second_half?
    second_half? && DateTime.now < start_time + 6.hours
  end
end
