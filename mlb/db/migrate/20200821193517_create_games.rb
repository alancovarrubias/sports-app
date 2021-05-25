class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :season
      t.references :away_team, references: :team
      t.references :home_team, references: :team
      t.date :date
      t.integer :num
      t.time :time
    end
  end
end
