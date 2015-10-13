class CreateAdvertCategories < ActiveRecord::Migration
  def change
    create_table :advert_categories do |t|
      t.belongs_to :advert, index: true
      t.belongs_to :product_category, index: true
      t.boolean :show_in_products, index: true

      t.integer :total_views, index: true
      t.integer :current_views, index: true, default: 0
      t.integer :residue_views, index: true, default: 0

      t.integer :views_in_category, index: true, default: 0
      t.integer :current_views_in_category, index: true, default: 0
      t.integer :residue_views_in_category, index: true, default: 0

      t.integer :views_in_category_today, index: true, default: 0
      t.integer :views_in_category_in_one_day, index: true, default: 0
      t.integer :current_views_in_category_today, index: true, default: 0
      t.integer :residue_views_in_category_today, index: true, default: 0


      t.integer :views_in_product, index: true, default: 0
      t.integer :current_views_in_product, index: true, default: 0
      t.integer :residue_views_in_product, index: true, default: 0
      t.integer :views_in_product_in_one_day, index: true, default: 0
      
      t.integer :views_in_product_today, index: true, default: 0
      t.integer :current_views_in_product_today, index: true, default: 0
      t.integer :residue_views_in_product_today, index: true, default: 0


      t.decimal :category_price
      t.decimal :total_price

      t.boolean :active_today, index: true, default: false 
      t.integer :time_days, index: true
      t.timestamps null: false
    end
  end
end
