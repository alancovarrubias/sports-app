# Make sure sizes are different for differentiation in tests
FactoryBot.define do
  factory :season do
    sequence(:year) { |n| 2000 + n }
    trait :with_teams do
      after(:create) { |season| create_list(:team, 10, season: season) }
    end
    trait :with_games do
      after(:create) { |season| create_list(:game, 10, season: season) }
    end
  end
end
