class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :season
      t.references :away_team, references: :team
      t.references :home_team, references: :team
      t.datetime :start_time
      t.date :date
    end

    add_index :games, %i[season_id date home_team_id], unique: true, name: 'index_games_on_season_date_home_team'
  end
end
