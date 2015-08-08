class AddFieldToOrder < ActiveRecord::Migration
  def change
  	add_column :orders, :surname, :string, index: true
  	add_column :orders, :skype, :string, index: true
  	add_column :orders, :phone, :string, index: true
  	add_column :orders, :adress, :string, index: true
  	add_column :orders, :additional_info, :text, index: true
  	add_column :orders, :responcse_status, :string, index: true, default: "data_processing"
  	add_column :orders, :viewed_seller, :boolean, index: true, default: false
  	
  end
end
