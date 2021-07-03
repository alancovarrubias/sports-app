class Player < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :team
  has_many :pitching_stats, as: :model
  has_many :batting_stats, as: :model

  # Validations
  validates :name, presence: true
  validates :abbr, uniqueness: { scope: %i[season_id team_id] }

  def season_stats
    sp_stats = season_pitching_stats
    sb_stats = season_batting_stats
    (0...sb_stats.size).map do |index|
      sp_stat = sp_stats[index]
      sb_stat = sb_stats[index]
      {
        year: sp_stat.interval.year,
        pitching: sp_stat,
        batting: sb_stat
      }
    end
  end

  def season_pitching_stats
    pitching_stats.select do |stat|
      stat.interval_type == 'Season'
    end
  end

  def season_batting_stats
    batting_stats.select do |stat|
      stat.interval_type == 'Season'
    end
  end
end
