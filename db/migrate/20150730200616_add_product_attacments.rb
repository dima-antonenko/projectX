class AddProductAttacments < ActiveRecord::Migration
  def change
  	add_column :products, :seo_title, :string, index: true
  	add_column :products, :seo_description, :string, index: true
  	add_column :products, :seo_keywords, :string, index: true
  end
end
