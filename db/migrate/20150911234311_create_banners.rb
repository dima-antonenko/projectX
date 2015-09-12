class CreateBanners < ActiveRecord::Migration
  def change
    create_table :banners do |t|
      t.string :name, index: true
      t.string :image, index: true
      t.string :descriptor, index: true
      t.boolean :to_category_sidebar, default: false, index: true 
    end

    add_column :products, :to_category_sidebar, :boolean, index: true
    add_column :product_categories, :to_category_sidebar, :boolean, index: true
  end
end
