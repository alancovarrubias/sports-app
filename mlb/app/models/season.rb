class Season < ApplicationRecord
  # Associations
  has_many :teams, dependent: :destroy
  has_many :players, dependent: :destroy
  has_many :games, dependent: :destroy
  has_many :pitching_stats, as: :interval, dependent: :destroy
  has_many :batting_stats, as: :interval, dependent: :destroy

  # Validations
  validates :year, presence: true, uniqueness: true
end
