class Season < ApplicationRecord
  # Associations
  has_many :games
  has_many :teams
  has_many :players
  has_many :stats
  has_many :lines
  has_many :preds
  # Validations
  validates :year, presence: true, uniqueness: true
end
