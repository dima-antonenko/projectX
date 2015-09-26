class AddTotalViewsToAdwert < ActiveRecord::Migration
  def change
  	add_column :adverts, :total_views, :integer,  default: 0
  end
end
