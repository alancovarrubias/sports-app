class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.references :game
      t.integer :type
      t.integer :period
      t.integer :spread
      t.integer :total
    end
  end
end
