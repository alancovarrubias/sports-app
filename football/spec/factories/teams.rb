FactoryBot.define do
  factory :team do
    association :season
    league { 'nfl' }
    sequence(:name) { |n| "name-#{n}" }
    sequence(:abbr) { |n| "abbr-#{n}" }
  end
end
