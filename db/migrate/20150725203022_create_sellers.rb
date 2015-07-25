class CreateSellers < ActiveRecord::Migration
  def change
    create_table :sellers do |t|
      t.string :name, index: true
      t.string :surname, index: true
      t.string :email, index: true
      t.string :skype, index: true
      t.string :phone, index: true
      t.string :zip, index: true
      t.string :sity, index: true
      t.string :avatar, index: true
      t.string :status, index: true
      t.text :info, index: true
      t.timestamps null: false
    end
  end
end
