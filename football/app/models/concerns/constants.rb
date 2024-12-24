module Constants
  GAME_CLOCKS = {
    not_started: 'Not Started',
    halftime: 'Halftime',
    second_half: 'Second Half',
    finished: 'Final'
  }.freeze
  VENUES = %w[away home].freeze
  INTERVALS = %w[full_game first_half].freeze
  BOOKS = %w[opener closer].freeze
  LEAGUES = %w[nfl cfb80 cfb81].freeze
end
