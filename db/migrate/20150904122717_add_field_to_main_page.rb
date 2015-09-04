class AddFieldToMainPage < ActiveRecord::Migration
  def change
  	add_column :products, :to_main_page, :boolean, index: true, default: false
  end
end
