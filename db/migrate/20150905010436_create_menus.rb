class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name, index: true
      t.string :descriptor, index: true
    end
  end
end
