class Game < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats, as: :interval
end
