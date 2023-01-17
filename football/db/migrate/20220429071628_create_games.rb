class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :season
      t.references :away_team
      t.references :home_team
      t.integer :away_num
      t.integer :home_num
      t.integer :espn_id
      t.integer :kicked
      t.integer :status
      t.datetime :current_time
      t.date :date
    end
  end
end
