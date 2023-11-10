class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.references :game
      t.integer :interval
      t.integer :book
      t.float :spread
      t.float :total
    end
  end
end
