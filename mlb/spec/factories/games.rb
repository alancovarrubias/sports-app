FactoryBot.define do
  factory :game do
    association :season
    association :away_team, factory: :team
    association :home_team, factory: :team
    date { Date.today }
    trait :with_stats do
      after(:create) do |game|
        away_starting_pitcher = create(:player, team: game.away_team)
        home_starting_pitcher = create(:player, team: game.home_team)
        create(:player_pitching_stat, game: game, model: away_starting_pitcher)
        create(:player_pitching_stat, game: game, model: home_starting_pitcher)
        away_batters = create_list(:player, 9, team: game.away_team)
        away_batters.each do |batter|
          create(:player_batting_stat, game: game, model: batter)
        end
        home_batters = create_list(:player, 9, team: game.home_team)
        home_batters.each do |batter|
          create(:player_batting_stat, game: game, model: batter)
        end
        create(:team_batting_stat, game: game, model: game.away_team)
        create(:team_pitching_stat, game: game, model: game.away_team)
        create(:team_batting_stat, game: game, model: game.home_team)
        create(:team_pitching_stat, game: game, model: game.home_team)
      end
    end
  end
end
