class AddOldColumns < ActiveRecord::Migration
  def change
  	add_column :sellers, :phone, :string, index: true
  	add_column :sellers, :name, :string, index: true
  	add_column :sellers, :surname, :string, index: true
  	add_column :sellers, :skype, :string
  	add_column :sellers, :zip, :string
  	add_column :sellers, :sity, :string
  	add_column :sellers, :count_reviews, :integer
  	add_column :sellers, :count_good_reviews, :integer
  	add_column :sellers, :score, :decimal, default: 1
  	

  end
end
