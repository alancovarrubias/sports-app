class Team < ApplicationRecord
  belongs_to :season
  validates :name, presence: true, uniqueness: { scope: %i[season_id] }
end
