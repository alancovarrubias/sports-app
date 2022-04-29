FactoryBot.define do
  factory :game do
    association :season
    association :away_team
    association :home_team
    sequence(:away_num) { |n| n * 2 }
    sequence(:home_num) { |n| n * 2 + 1 }
    sequence(:espn_id) { |n| n }
    date { Date.today }
    league { 'nfl' }
    kicked { 'home' }
    status { 'Final' }
  end
end
