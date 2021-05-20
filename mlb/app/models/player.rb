class Player < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :team
  has_many :pitching_stats, as: :model
  has_many :batting_stats, as: :model

  # Validations
  validates :name, presence: true
  validates :abbr, uniqueness: { scope: %i[season_id team_id] }
end
