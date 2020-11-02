class CreateBattingStats < ActiveRecord::Migration[6.0]
  def change
    create_table :batting_stats do |t|
      t.references :season
      t.references :game
      t.references :model, polymorphic: true
      t.integer :ab
      t.integer :r
      t.integer :h
      t.integer :rbi
      t.integer :bb
      t.integer :so
      t.integer :pa
      t.float :ba
      t.float :obp
      t.float :slg
      t.float :ops
    end
  end
end
