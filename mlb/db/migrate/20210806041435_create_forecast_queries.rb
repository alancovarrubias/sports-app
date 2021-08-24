class CreateForecastQueries < ActiveRecord::Migration[6.0]
  def change
    create_table :forecast_queries do |t|
      t.references :game
      t.datetime :datetime
      t.integer :hour
    end
  end
end
