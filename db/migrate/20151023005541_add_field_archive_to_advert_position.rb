class AddFieldArchiveToAdvertPosition < ActiveRecord::Migration
  def change
  	add_column :advert_positions, :archive, :boolean, index: true, default: false
  end
end
