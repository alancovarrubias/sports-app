class Stat < ApplicationRecord
  belongs_to :game
  belongs_to :team

  enum interval: %i[full_game first_half]
  def total_plays
    attempts + carries
  end

  def total_yards
    passing_yards + rushing_yards
  end

  def ave_per_car
    (rushing_yards / carries.to_f).round(1)
  end

  def ave_per_att
    (passing_yards / attempts.to_f).round(1)
  end

  def ave_per_play
    (total_yards / total_plays.to_f).round(2)
  end
end
