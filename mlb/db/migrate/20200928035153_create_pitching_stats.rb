class CreatePitchingStats < ActiveRecord::Migration[6.0]
  def change
    create_table :pitching_stats do |t|
      t.references :interval, polymorphic: true
      t.references :model, polymorphic: true
      t.boolean :is_starter, default: false
      t.float :ip
      t.integer :h
      t.integer :r
      t.integer :er
      t.integer :bb
      t.integer :so
      t.integer :hr
      t.float :era
      t.integer :fb
      t.integer :ld
      t.integer :gb
      t.integer :fb_p
      t.integer :ld_p
      t.integer :gb_p
    end
  end
end
