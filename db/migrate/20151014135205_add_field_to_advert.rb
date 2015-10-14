class AddFieldToAdvert < ActiveRecord::Migration
  def change
  	add_column :adverts, :archive, :boolean, index: true, default: false
  	add_column :advert_categories, :archive, :boolean, index: true, default: false
  end
end
