FactoryBot.define do
  factory :line do
    association :season
    association :game
  end
end
