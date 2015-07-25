class CreateProductCategories < ActiveRecord::Migration
  def change
    create_table :product_categories do |t|
      t.string :name, index: true
      t.text :description, index: true
      t.string :avatar, index: true
      t.string :to_main_page, index: true
      t.timestamps null: false
    end
  end
end
