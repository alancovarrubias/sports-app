FactoryBot.define do
  factory :stat do
    factory :player_stat do
      association :model, factory: :player
    end
    factory :team_stat do
      association :model, factory: :team
    end
  end
end
