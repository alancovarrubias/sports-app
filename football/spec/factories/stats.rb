FactoryBot.define do
  factory :stat do
    association :game
    association :team
  end
end
