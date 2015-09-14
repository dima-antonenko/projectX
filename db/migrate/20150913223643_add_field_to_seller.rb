class AddFieldToSeller < ActiveRecord::Migration
  def change
  	add_column :sellers, :sales, :integer, default: 0, index: true
  	add_column :sellers, :score, :decimal, default: 0.00, index: true
  	add_column :sellers, :good_reviews, :integer, default: 0, index: true


  end
end
