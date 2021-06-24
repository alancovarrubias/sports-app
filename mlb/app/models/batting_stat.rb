class BattingStat < ApplicationRecord
  belongs_to :interval, polymorphic: true
  belongs_to :model, polymorphic: true

  has_one :self_ref, class_name: 'BattingStat', foreign_key: 'id'
  has_one :season, through: :self_ref, source: :interval, source_type: 'Season'
  has_one :game, through: :self_ref, source: :interval, source_type: 'Game'
  has_one :player, through: :self_ref, source: :model, source_type: 'Player'
  has_one :team, through: :self_ref, source: :model, source_type: 'Team'

  scope :team_stats, -> { where(model_type: 'Team') }
  scope :player_stats, -> { where(model_type: 'Player') }
  scope :season_stats, -> { where(interval_type: 'Season') }
  scope :game_stats, -> { where(interval_type: 'Game') }
end
