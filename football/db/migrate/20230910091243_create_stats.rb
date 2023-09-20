class CreateStats < ActiveRecord::Migration[6.0]
  def change
    create_table :stats do |t|
      t.references :team
      t.references :game
      t.integer :interval
      t.integer :completions
      t.integer :attempts
      t.integer :passing_yards
      t.integer :carries
      t.integer :rushing_yards
    end
  end
end
