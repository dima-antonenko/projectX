class CreateAdvertPositions < ActiveRecord::Migration
  def change
    create_table :advert_positions do |t|
      t.belongs_to :advert
      t.integer :product_category_id, index: true
      t.integer :product_id, index: true
      t.string  :place, index: true, default: "product_category"
      t.decimal :place_price, default: 0
      t.integer :views, default: 0
      t.integer :time_days, default: 1
      t.decimal :total_price, default: 0

      t.integer :views_today, default: 0      
      t.boolean :active, default: false
      t.boolean :active_today, default: false
      t.timestamps null: false
    end

    add_column :product_categories, :price_show_advert_in_category, :decimal, index: true, default: 1
    add_column :product_categories, :price_show_advert_in_product, :decimal, index: true, default: 1
  end
end
