class AddLinkToBanner < ActiveRecord::Migration
  def change
  	add_column :banners, :link, :string, index: true, default: "/"
  end
end
