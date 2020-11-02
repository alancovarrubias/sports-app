class Team < ApplicationRecord
  # Associations
  belongs_to :season
  has_many :players
  has_many :pitching_stats, as: :model
  has_many :batting_stats, as: :model

  def full_name
    [city, name].join(' ')
  end
end
