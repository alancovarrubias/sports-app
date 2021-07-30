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
      t.integer :wind_speed
      t.string :wind_direction
      t.float :pressure
    end
  end
end
