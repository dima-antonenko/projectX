class AddFiledsActiveTodayToAdvertCategory < ActiveRecord::Migration
  def change
  	remove_column :advert_categories, :active_today
  	add_column :advert_categories, :active_today_in_category, :boolean, index: true, default: false
  	add_column :advert_categories, :active_today_in_product, :boolean, index: true, default: false  
  end
end
