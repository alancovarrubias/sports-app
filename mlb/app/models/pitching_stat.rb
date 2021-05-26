class PitchingStat < ApplicationRecord
  belongs_to :interval, polymorphic: true
  belongs_to :model, polymorphic: true
  scope :team_stats, -> { where(model_type: 'Team') }
  scope :player_stats, -> { where(model_type: 'Player') }
end
