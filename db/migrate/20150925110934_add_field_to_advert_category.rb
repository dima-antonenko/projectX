class AddFieldToAdvertCategory < ActiveRecord::Migration
  def change
  	add_column :advert_categories, :residue_views_in_product, :integer, index: true, default: 0
  	add_column :advert_categories, :residue_views_in_category, :integer, index: true, default: 0
  	add_column :advert_categories, :active, :boolean, index: true, default: false
  	add_column :adverts, :active, :boolean, index: true, default: false
  end
end