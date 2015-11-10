class AddRelationSellerMiniCart < ActiveRecord::Migration
  def change
  	add_column :mini_carts, :seller_id, :integer, index: true
  end
end
