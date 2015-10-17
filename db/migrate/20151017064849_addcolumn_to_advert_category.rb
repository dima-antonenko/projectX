class AddcolumnToAdvertCategory < ActiveRecord::Migration
  def change
  	add_column :advert_categories, :residue_time_days, :integer, index: true, default: 0
  end
end
