class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.references :season
      t.string :name
      t.string :abbr
      t.integer :league
    end
  end
end
