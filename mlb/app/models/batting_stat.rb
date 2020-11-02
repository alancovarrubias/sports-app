class BattingStat < ApplicationRecord
  belongs_to :season
  belongs_to :game
  belongs_to :model, polymorphic: true
  scope :team_stats, -> { where(model_type: 'Team') }
  scope :player_stats, -> { where(model_type: 'Player') }
end
