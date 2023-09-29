class CreateStats < ActiveRecord::Migration[6.0]
  def change
    create_table :stats do |t|
      t.references :team
      t.references :game
      t.integer :interval
      t.integer :score, default: 0
      t.integer :completions, default: 0
      t.integer :attempts, default: 0
      t.integer :passing_yards, default: 0
      t.integer :longest_pass, default: 0
      t.integer :carries, default: 0
      t.integer :rushing_yards, default: 0
      t.integer :longest_rush, default: 0
    end
  end
end
