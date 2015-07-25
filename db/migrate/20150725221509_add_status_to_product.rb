class AddStatusToProduct < ActiveRecord::Migration
  def change
  	add_column :products, :string, :status, index: true 
  end
end
