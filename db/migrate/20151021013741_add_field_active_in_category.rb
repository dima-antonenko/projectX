class AddFieldActiveInCategory < ActiveRecord::Migration
  def change
  	add_column :advert_categories, :active_in_category, :boolean, index: true, default: false
  	add_column :advert_categories, :active_in_product, :boolean, index: true, default: false  
  end
end
