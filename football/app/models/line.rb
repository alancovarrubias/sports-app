class Line < ApplicationRecord
  belongs_to :game
  
  enum interval: %i[full_game first_half]
end
