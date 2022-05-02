FactoryBot.define do
  factory :batting_stat do
    factory :player_batting_stat, class: 'BattingStat' do
      association :interval, factory: :game
      association :model, factory: :player
    end
    factory :team_batting_stat, class: 'BattingStat' do
      association :interval, factory: :game
      association :model, factory: :team
    end
  end
end
