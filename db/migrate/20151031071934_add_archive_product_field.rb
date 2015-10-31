class AddArchiveProductField < ActiveRecord::Migration
  def change
  	add_column :products, :archive, :boolean, index: true, default: false
  end
end
