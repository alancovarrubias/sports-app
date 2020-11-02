FactoryBot.define do
  factory :batting_stat do
    association :season
    association :game
    factory :player_batting_stat do
      association :model, factory: :player
    end
    factory :team_batting_stat do
      association :model, factory: :team
    end
  end
end
