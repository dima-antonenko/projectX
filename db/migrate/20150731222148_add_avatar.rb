class AddAvatar < ActiveRecord::Migration
  def change
  	add_column :products, :avatar, :string, index: true
  end
end
