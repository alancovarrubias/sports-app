class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.references :season
      t.references :game
      t.string :bookie
      t.float :total
    end
  end
end
