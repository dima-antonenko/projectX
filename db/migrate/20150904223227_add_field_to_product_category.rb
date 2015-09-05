class AddFieldToProductCategory < ActiveRecord::Migration
  def change
  	add_column :product_categories, :to_main_page_product_categories_list, :boolean, default: false, index: true
  	add_column :product_categories, :to_main_page_product_categories_list_order, :integer, default: 1, index: true 
  end
end
