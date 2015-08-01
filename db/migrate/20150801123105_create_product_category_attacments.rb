class CreateProductCategoryAttacments < ActiveRecord::Migration
  def change
  	create_table :product_category_attacments do |t|
	    t.belongs_to :product_category, index: true
	    t.string :image, index: true
	    t.timestamps null: false
	end    
  end
end