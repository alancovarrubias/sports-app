FactoryBot.define do
  factory :line do
    association :team
    association :game
    type { 'opener' }
    period { 'full_game' }
    spread { 10 }
    total { 100 }
  end
end
