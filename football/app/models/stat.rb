class Stat < ApplicationRecord
  belongs_to :game
  belongs_to :team

  enum interval: INTERVALS
  def c_att
    "#{completions}/#{attempts}"
  end

  def total_plays
    attempts + carries
  end

  def total_yards
    passing_yards + rushing_yards
  end

  def ave_per_car
    float_div(rushing_yards, carries, 1)
  end

  def ave_per_att
    float_div(passing_yards, attempts, 1)
  end

  def ave_per_play
    float_div(total_yards, total_plays)
  end

  def typa
    float_div(passing_yards, completions)
  end

  def typai
    float_div(passing_yards - longest_pass, completions - 1)
  end

  def typc
    float_div(rushing_yards - longest_rush, carries - 1)
  end

  def typp
    float_div(total_yards - longest_rush - longest_pass, total_plays - 2)
  end

  def as_json(options = {})
    super(options).merge(
      'c_att' => c_att,
      'total_plays' => total_plays,
      'total_yards' => total_yards,
      'ave_per_car' => ave_per_att,
      'ave_per_att' => ave_per_att,
      'ave_per_play' => ave_per_play,
      'typa' => typa,
      'typai' => typai,
      'typc' => typc,
      'typp' => typp
    )
  end

  private

  def float_div(num, denom, round = 2)
    return 0 if denom.zero?

    (num / denom.to_f).round(round)
  end
end
