class Game < ApplicationRecord
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats

  def full_game_stat
    stats.find_by(interval: 'Full Game')
  end

  def first_half_stat
    stats.find_by(interval: 'First Half')
  end
end
