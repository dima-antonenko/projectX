class AddFieldToAdvertCategory < ActiveRecord::Migration
  def change 	
  	add_column :advert_categories, :active, :boolean, index: true, default: false
  	add_column :advert_categories, :views_today, :integer, index: true, default: 0
  	add_column :advert_categories, :views_in_day, :integer, index: true, default: 0
  	
  	add_column :adverts, :active, :boolean, index: true, default: false
  end
end