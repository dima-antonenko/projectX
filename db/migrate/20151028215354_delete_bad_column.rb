class DeleteBadColumn < ActiveRecord::Migration
  def change
  	remove_column :orders, :responcse_status
  	add_column :orders, :responce_status, :string, index: true, default: "data_processing" 
  end
end
