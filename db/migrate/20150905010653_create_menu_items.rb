class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.belongs_to :menu, index: true
      t.belongs_to :menu_item, index: true
      t.string :name, index: true
      t.string :descriptor, index: true
      t.string :link, index: true
      t.integer :position, index: true
    end
  end
end
