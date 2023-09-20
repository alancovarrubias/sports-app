class Game < ApplicationRecord
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats

  VENUES = %w[away home].freeze
  VENUES.product(Stat.intervals.keys).each do |venue, interval|
    define_method("#{venue}_#{interval}_stat") do
      stats.find do |stat|
        stat.interval == interval && stat.team_id == send("#{venue}_team_id")
      end
    end
  end
end
