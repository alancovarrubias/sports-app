class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :season
      t.references :away_team, references: :team
      t.references :home_team, references: :team
      t.datetime :start_time
      t.date :date
    end
  end
end
