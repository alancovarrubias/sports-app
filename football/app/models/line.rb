class Line < ApplicationRecord
  belongs_to :game

  enum interval: INTERVALS
  enum book: BOOKS
end
