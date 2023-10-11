class Team < ApplicationRecord
  belongs_to :season
  validates :name, presence: true, uniqueness: { scope: %i[season_id] }

  def self.find_like_name(name)
    Team.find_by('name LIKE ?', "%#{name}%")
  end
end
