class CreatePreds < ActiveRecord::Migration[6.0]
  def change
    create_table :preds do |t|
      t.references :season
      t.references :game
      t.string :desc
      t.float :away_score
      t.float :home_score
    end
  end
end
