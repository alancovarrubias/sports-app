class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :season
      t.references :away_team
      t.references :home_team
      t.references :kicking_team
      t.integer :espn_id
      t.string :week
      t.date :date
      t.datetime :start_time
      t.string :game_clock, default: ''
      t.datetime :enqueued_at
      t.datetime :calculated_at
      t.timestamps
    end
  end
end
