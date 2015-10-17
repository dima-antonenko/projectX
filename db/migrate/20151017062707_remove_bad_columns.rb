class RemoveBadColumns < ActiveRecord::Migration
  def change
  	remove_column :advert_categories, :views_in_category_in_one_day
  	remove_column :advert_categories, :views_in_product_in_one_day
  	remove_column :advert_categories, :current_views_in_category
  	remove_column :advert_categories, :current_views_in_category_today

  	remove_column :advert_categories, :current_views_in_product
  	remove_column :advert_categories, :current_views_in_product_today

  	remove_column :advert_categories, :current_views
  	
    
  end
end
