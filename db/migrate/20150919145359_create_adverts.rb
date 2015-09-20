class CreateAdverts < ActiveRecord::Migration
  def change
    create_table :adverts do |t|
      t.belongs_to :seller, index: true
      #data advert
      t.integer :product_id, index: true
      t.string  :place_type, index: true, default: "product_category"

      #prices
      t.boolean :show_in_products, index: true
      t.integer :views, index: true, default: 1      
      t.integer :time_days, index: true
      t.decimal :total_price, index: true

      #views
      t.integer :current_views, index: true, default: 0
      t.integer :residue_views, index: true

      #status
      t.string  :status, index: true, default: "processed"
      t.boolean :viewed_admin, default: false
      t.timestamps null: false
    end

    add_column :product_categories, :count_views, :integer, index: true
    add_column :product_categories, :price_advert, :decimal, index: true
    add_column :product_categories, :margin_product_one_view, :decimal, index: true
  end
end
