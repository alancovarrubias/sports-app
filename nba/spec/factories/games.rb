FactoryBot.define do
  factory :game do
    association :season
    association :away_team, factory: :team
    association :home_team, factory: :team
  end
end
