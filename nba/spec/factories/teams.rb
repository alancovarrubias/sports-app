FactoryBot.define do
  factory :team do
    association :season
    sequence(:name) { |n| "name-#{n}" }
    sequence(:city) { |n| "city-#{n}" }
    sequence(:abbr) { |n| "abbr-#{n}" }
    trait :with_players do
      after(:create) do |team|
        create_list(:player, 5, team: team)
      end
    end
  end
end
