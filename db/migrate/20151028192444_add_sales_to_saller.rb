class AddSalesToSaller < ActiveRecord::Migration
  def change
  	add_column :sellers, :count_sales, :integer, default: 0
  end
end
