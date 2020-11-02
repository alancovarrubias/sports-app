class Player < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :team
  has_many :stats, as: :model
  # Validations
  validates :name, presence: true
  validates :abbr, presence: true, uniqueness: { scope: [:season_id, :team_id] }
end
