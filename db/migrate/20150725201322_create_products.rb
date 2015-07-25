class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
   	  t.belongs_to :product_category, index: true
   	  t.belongs_to :seller, index: true

   	  t.string :name, index: true
   	  t.text :description, index: true
   	  t.text :short_description, index: true
   	  t.decimal :price, index: true
   	  t.decimal :old_price, index: true
   	  t.string :sku, index: true
   	  t.string :avability, index: true
   	  t.integer :qty, index: true
   	  t.boolean :best_seller_prouduct, index: true, default: false

      t.timestamps null: false
    end
  end
end
