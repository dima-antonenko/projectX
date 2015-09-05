class AddFieldsToProduct < ActiveRecord::Migration
  def change
  	add_column :products, :count_sales, :integer, index: true
  	add_column :products, :count_views, :integer, index: true
  	add_column :products, :show_in_category_block_to_main_page, :boolean, default: false, index: true
  end
end
