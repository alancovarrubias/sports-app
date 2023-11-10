FactoryBot.define do
  factory :line do
    association :game
    interval { 'full_game' }
    sequence(:spread) { |n| -10 - n }
    sequence(:total) { |n| 100 + n }
  end
end
