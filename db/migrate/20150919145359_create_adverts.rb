class CreateAdverts < ActiveRecord::Migration
  def change
    create_table :adverts do |t|
      t.belongs_to :seller, index: true
      t.integer :product_id, index: true  
        
      t.decimal :total_price, index: true, default: 0
      t.integer :total_views, index: true, default: 0
      t.timestamps null: false
    end

    add_column :product_categories, :count_views, :integer, index: true
    add_column :product_categories, :price_advert, :decimal, index: true
    add_column :product_categories, :margin_product_one_view, :decimal, index: true
  end
end
