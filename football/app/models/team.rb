class Team < ApplicationRecord
  belongs_to :season
  validates :name, presence: true, uniqueness: { scope: %i[season_id league] }

  scope :nfl, -> { where(league: 'nfl') }
  scope :cfb, -> { where(league: 'cfb') }
end
