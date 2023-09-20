class Stat < ApplicationRecord
  belongs_to :game
  belongs_to :team

  enum interval: %i[full_game first_half]
end
