FactoryBot.define do
  factory :player_pitching_stat, class: 'PitchingStat' do
    association :interval, factory: :game
    association :model, factory: :player
  end
  factory :team_pitching_stat, class: 'PitchingStat' do
    association :interval, factory: :game
    association :model, factory: :team
  end
end
