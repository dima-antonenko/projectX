class ChangeProductCategory < ActiveRecord::Migration
  def change
  	add_column :product_categories, :product_category_id, :integer, index: true

  	add_column :product_categories, :seo_title, :string, index: true
  	add_column :product_categories, :seo_description, :string, index: true
  	add_column :product_categories, :seo_keywords, :string, index: true
  end
end
