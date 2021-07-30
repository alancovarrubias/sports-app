class Forecast < ApplicationRecord
  belongs_to :season
  belongs_to :game
end
