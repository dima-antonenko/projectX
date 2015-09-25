class CreateAdvertCategories < ActiveRecord::Migration
  def change
    create_table :advert_categories do |t|
      t.belongs_to :advert, index: true
      t.belongs_to :product_category, index: true
      t.boolean :show_in_products, index: true

      t.integer :views, index: true, default: 5
      t.integer :current_views, index: true, default: 0
      t.integer :residue_views, index: true

      t.decimal :category_price
      t.decimal :total_price

      t.integer :time_days, index: true, default: 5
    end
  end
end
