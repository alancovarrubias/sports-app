class Season < ApplicationRecord
  validates :year, presence: true, uniqueness: true
end
