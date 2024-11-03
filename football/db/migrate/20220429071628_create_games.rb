class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :season
      t.references :away_team
      t.references :home_team
      t.integer :espn_id
      t.integer :week
      t.integer :kicked
      t.date :date
      t.datetime :start_time
      t.string :game_clock
      t.datetime :enqueued_at
      t.datetime :calculated_at
      t.timestamps
    end
  end
end
