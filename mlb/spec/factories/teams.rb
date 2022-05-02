FactoryBot.define do
  factory :team do
    association :season
    timezone { 'Pacific Time (US & Canada)' }

    trait :with_players do
      after(:create) { |team| create_list(:player, 5, team: team, season: team.season) }
    end
  end
end
