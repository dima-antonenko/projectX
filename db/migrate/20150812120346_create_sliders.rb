class CreateSliders < ActiveRecord::Migration
  def change
    create_table :sliders do |t|
      t.string :name, index: true
      t.string :descriptor, index: true
      t.string :image, index: true
      t.timestamps null: false
    end
  end
end
