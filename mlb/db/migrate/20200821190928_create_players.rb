class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.references :season
      t.references :team
      t.string :name
      t.string :abbr
      t.string :position
    end
  end
end
