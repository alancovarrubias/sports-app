class Season < ApplicationRecord
  has_many :teams
  has_many :games
  validates :year, presence: true, uniqueness: { scope: %i[league] }
  validates :league, presence: true, uniqueness: { scope: %i[year] }
  enum league: %i[nfl cfb80 cfb81]
end
