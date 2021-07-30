class CreateForecasts < ActiveRecord::Migration[6.0]
  def change
    create_table :forecasts do |t|
      t.references :season
      t.references :game
      t.string :time
      t.string :conditions
      t.integer :temp
      t.integer :dew
      t.integer :humidity
      t.string :wind
      t.float :pressure
    end
  end
end
