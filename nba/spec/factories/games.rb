FactoryBot.define do
  factory :game do
    association :season
    association :away_team, factory: :team
    association :home_team, factory: :team
    trait :with_stats do
      after(:create) do |game|
        create_list(:team_stat, 2, game: game)
        create_list(:player_stat, 4, game: game)
      end
    end
    trait :complete do
      after(:create) do |game|
        players = create_list(:player, 2, team: game.away_team)
        players.each do |player|
          create(:player_stat, game: game, model: player)
        end
        players = create_list(:player, 4, team: game.home_team)
        players.each do |player|
          create(:player_stat, game: game, model: player)
        end
        create(:team_stat, game: game, model: game.away_team)
        create(:team_stat, game: game, model: game.home_team)
      end
    end
  end
end
