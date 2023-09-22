FactoryBot.define do
  factory :stat do
    association :game
    association :team
    sequence(:attempts) { |n| n }
    sequence(:completions) { |n| n + 2 }
    sequence(:carries) { |n| n + 1 }
    sequence(:passing_yards) { |n| n + 3 }
    sequence(:rushing_yards) { |n| n + 4 }
    sequence(:longest_rush) { |n| n + 5 }
    sequence(:longest_pass) { |n| n + 6 }
    sequence(:score) { |n| n + 7 }
  end
end
