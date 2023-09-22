class CreateStats < ActiveRecord::Migration[6.0]
  def change
    create_table :stats do |t|
      t.references :team
      t.references :game
      t.integer :interval
      t.integer :score
      t.integer :completions
      t.integer :attempts
      t.integer :passing_yards
      t.integer :longest_pass
      t.integer :carries
      t.integer :rushing_yards
      t.integer :longest_rush
    end
  end
end
