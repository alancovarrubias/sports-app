class Team < ApplicationRecord
  belongs_to :season
  validates :name, presence: true, uniqueness: { scope: :season_id }
  validates :abbr, presence: true, uniqueness: { scope: :season_id }
end
