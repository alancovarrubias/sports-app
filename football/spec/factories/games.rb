FactoryBot.define do
  factory :game do
    association :season
    association :away_team, factory: :team
    association :home_team, factory: :team
    date { Date.today }
    start_time { DateTime.now }
    game_clock { 'Final' }
    sequence(:espn_id) { |n| n }
  end
end
