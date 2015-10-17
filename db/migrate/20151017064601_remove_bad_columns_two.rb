class RemoveBadColumnsTwo < ActiveRecord::Migration
  def change
  	remove_column :advert_categories, :views_today
    remove_column :advert_categories, :views_in_day
  end
end
