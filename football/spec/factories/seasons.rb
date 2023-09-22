FactoryBot.define do
  factory :season do
    sequence(:year) { |n| 2000 + n }
    league { 'nfl' }
  end
end
