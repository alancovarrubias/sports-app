class Season < ApplicationRecord
  has_many :teams, dependent: :destroy
  has_many :games, dependent: :destroy
  validates :year, presence: true, uniqueness: { scope: %i[league] }
  validates :league, presence: true, uniqueness: { scope: %i[year] }
  enum league: LEAGUES
end
