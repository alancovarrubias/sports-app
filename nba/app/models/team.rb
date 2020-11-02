class Team < ApplicationRecord
  # Associations
  belongs_to :season
  has_many :players
  has_many :stats, as: :model
  # Validations
  validates :name, presence: true, uniqueness: { scope: [:season_id] }
  validates :abbr, presence: true, uniqueness: { scope: [:season_id] }
  validates :city, presence: true

end
