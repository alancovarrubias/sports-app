class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.references :game
      t.string :bookie
      t.float :total
      t.float :spread
    end
  end
end
