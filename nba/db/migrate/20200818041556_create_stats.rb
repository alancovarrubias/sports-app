class CreateStats < ActiveRecord::Migration[6.0]
  def change
    create_table :stats do |t|
      t.references :season
      t.references :game
      t.references :model, polymorphic: true
      t.integer :sp
      t.integer :fg
      t.integer :fga
      t.integer :fg3
      t.integer :fg3a
      t.integer :ft
      t.integer :fta
      t.integer :orb
      t.integer :drb
      t.integer :ast
      t.integer :stl
      t.integer :blk
      t.integer :tov
      t.integer :pf
      t.integer :pts
      t.integer :ortg
      t.integer :drtg
    end
  end
end
