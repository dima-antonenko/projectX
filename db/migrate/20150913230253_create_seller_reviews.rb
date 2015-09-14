class CreateSellerReviews < ActiveRecord::Migration
  def change
    create_table :seller_reviews do |t|
      t.belongs_to :seller
      t.string :name, index: true
      t.string :email, index: true
      t.string :phone, index: true
      t.string :skype, index: true
      t.integer :rating, index: true, default: 3
      t.boolean :published, default: false, index: true 
      t.timestamps null: false
    end
  end
end
