FactoryBot.define do
  factory :player do
    association :season
    association :team
    sequence(:name) { |n| "name-#{n}" }
    sequence(:abbr) { |n| "abbr-#{n}" }
  end
end
