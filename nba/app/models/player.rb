class Player < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :team
  has_many :stats, as: :model
  # Validations
  validates :name, presence: true
  validates :abbr, presence: true, uniqueness: { scope: %i[season_id team_id] }
end
