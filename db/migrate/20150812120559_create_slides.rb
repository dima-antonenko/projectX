class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.belongs_to :slider, index: true
      t.string :title, index: true
      t.string :image, index: true
      t.string :descriptor, index: true	
      t.timestamps null: true
    end
  end
end
