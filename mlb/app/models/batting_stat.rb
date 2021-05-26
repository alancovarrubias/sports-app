class BattingStat < ApplicationRecord
  belongs_to :interval, polymorphic: true
  belongs_to :model, polymorphic: true
  scope :team_stats, -> { where(model_type: 'Team', interval_type: 'Game') }
  scope :player_stats, -> { where(model_type: 'Player', interval_type: 'Game') }
end
