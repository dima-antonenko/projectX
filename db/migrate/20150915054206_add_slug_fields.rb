class AddSlugFields < ActiveRecord::Migration
  def change
  	add_column :products, :slug, :string, index: true
  	add_column :product_categories, :slug, :string, index: true
  	add_column :post_categories, :slug, :string, index: true
  	add_column :posts, :slug, :string, index: true
  	add_column :static_pages, :slug, :string, index: true
  end
end
