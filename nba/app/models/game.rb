class Game < ApplicationRecord
  # Associations
  belongs_to :season
  belongs_to :away_team, class_name: 'Team'
  belongs_to :home_team, class_name: 'Team'
  has_many :stats, as: :interval

  def url
    format_options = { year: date.year, month: date.month, day: date.day, home_team: home_team.abbr }
    format('%<year>d%<month>02d%<day>02d0%<home_team>s', format_options)
  end
end
