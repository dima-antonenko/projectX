class CreateProductAttacments < ActiveRecord::Migration
  def change
    create_table :product_attacments do |t|
      t.belongs_to :product, index: true
      t.string :image, index: true
      t.timestamps null: false
    end
  end
end
