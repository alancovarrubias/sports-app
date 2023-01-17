FactoryBot.define do
  factory :game do
    association :season
    association :away_team, factory: :team
    association :home_team, factory: :team
    date { Date.today }
    current_time { DateTime.now }
    sequence(:away_num) { |n| n * 2 }
    sequence(:home_num) { |n| n * 2 + 1 }
    sequence(:espn_id) { |n| n }
    kicked { 'home' }
    status { 'Final' }
  end
end
