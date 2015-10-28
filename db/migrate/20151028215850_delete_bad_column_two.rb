class DeleteBadColumnTwo < ActiveRecord::Migration
  def change
  	remove_column :orders, :adress
  end
end
