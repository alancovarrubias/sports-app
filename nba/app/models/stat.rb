class Stat < ApplicationRecord
  belongs_to :model, polymorphic: true
  belongs_to :interval, polymorphic: true
end
