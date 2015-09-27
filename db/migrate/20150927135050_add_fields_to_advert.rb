class AddFieldsToAdvert < ActiveRecord::Migration
  def change
  	add_column :adverts, :residue_views, :integer, index: true, default: 0
  end
end
