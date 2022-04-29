class Team < ApplicationRecord
  belongs_to :season
  validates :name, presence: true, uniqueness: { scope: %i[season_id league] }
  validates :abbr, presence: true, uniqueness: { scope: %i[season_id league] }
  enum league: %i[nfl cfb]
end
