class CreatePitchingStats < ActiveRecord::Migration[6.0]
  def change
    create_table :pitching_stats do |t|
      t.references :season
      t.references :game
      t.references :model, polymorphic: true
      t.float :ip
      t.integer :h
      t.integer :r
      t.integer :er
      t.integer :bb
      t.integer :so
      t.integer :hr
      t.float :era
    end
  end
end
