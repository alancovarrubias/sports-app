class Game < ApplicationRecord
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats

  VENUES = %w[away home].freeze
  INTERVALS = ['Full Game', 'First Half'].freeze
  VENUES.product(INTERVALS).each do |venue, interval|
    define_method("#{venue}_#{interval.methodize}_stat") do
      stats.find do |stat|
        stat.interval == interval && stat.team_id == send("#{venue}_team_id")
      end
    end
  end
end
