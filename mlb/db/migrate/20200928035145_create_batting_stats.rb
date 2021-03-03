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
      t.integer :fb
      t.integer :ld
      t.integer :gb
      t.integer :fb_p
      t.integer :ld_p
      t.integer :gb_p
    end
  end
end
