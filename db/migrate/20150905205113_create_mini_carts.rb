class CreateMiniCarts < ActiveRecord::Migration
  def change
    create_table :mini_carts do |t|
    t.belongs_to :product, index: true
    t.string :name, index: true
    t.string :email, index: true
    t.string :phone, index: true
    t.string :address, index: true
    t.integer :count, index: true
    t.boolean :agree_newsletter, default: true, index: true
    t.timestamps null: false
    end
  end
end
