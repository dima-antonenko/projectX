class AddHotProductSelecter < ActiveRecord::Migration
  def change
  	add_column :products, :hot_product, :boolean, default: false
  end
end
