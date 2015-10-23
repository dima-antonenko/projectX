class RemoveOldColumns < ActiveRecord::Migration
  def change
  	drop_table :advert_categories
  	remove_column :product_categories, :price_advert
  	remove_column :product_categories, :margin_product_one_view  	
  end
end
