module Constants
  GAME_CLOCKS = {
    not_started: 'Not Started',
    halftime: 'Halftime',
    second_half: 'Second Half',
    finished: 'Final'
  }.freeze
  VENUES = %i[away home].freeze
  INTERVALS = %i[full_game first_half].freeze
  BOOKS = %i[opener closer].freeze
  LEAGUES = %w[nfl cfb80 cfb81].freeze
end
