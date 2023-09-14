FactoryBot.define do
  factory :game do
    association :season
    association :away_team, factory: :team
    association :home_team, factory: :team
    sequence(:espn_id) { |n| n }
    date { Date.today }
    start_time { DateTime.now }
    game_clock { 'Final' }
    week { 1 }
  end
end
