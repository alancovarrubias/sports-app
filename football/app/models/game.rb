class Game < ApplicationRecord
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats, dependent: :destroy
  has_many :lines, dependent: :destroy
  enum kicked: %i[away home].freeze
  scope :started, -> { where('start_time <= ?', DateTime.now) }
  scope :not_started, -> { where('start_time > ?', DateTime.now) }

  kicked.keys.product(Stat.intervals.keys).each do |venue, interval|
    define_method("#{venue}_#{interval}_stat") do
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

  def finished?
    game_clock&.include?('Final')
  end

  def recently_second_half?
    game_clock == 'Second Half' && DateTime.now < start_time + 6.hours
  end
end
