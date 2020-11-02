FactoryBot.define do
  factory :stat do
    association :season
    association :game
    factory :player_stat do
      association :model, factory: :player
    end
    factory :team_stat do
      association :model, factory: :team
    end
  end
end
