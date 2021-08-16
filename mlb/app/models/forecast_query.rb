class ForecastQuery < ApplicationRecord
  belongs_to :game
  has_many :forecasts
end
