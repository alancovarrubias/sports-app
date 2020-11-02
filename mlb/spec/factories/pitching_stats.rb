FactoryBot.define do
  factory :pitching_stat do
    association :season
    association :game
    factory :player_pitching_stat do
      association :model, factory: :player
    end
    factory :team_pitching_stat do
      association :model, factory: :team
    end
  end
end
