class CreateForecasts < ActiveRecord::Migration[6.0]
  def change
    create_table :forecasts do |t|
      t.references :forecast_query
      t.datetime :datetime
      t.string :conditions
      t.integer :temp
      t.integer :dew
      t.integer :humidity
      t.string :wind
      t.float :pressure
    end
  end
end
