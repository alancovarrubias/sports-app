FactoryBot.define do
  factory :team do
    association :season
    trait :with_players do
      after(:create) { |team| create_list(:player, 5, team: team, season: team.season) }
    end
  end
end
