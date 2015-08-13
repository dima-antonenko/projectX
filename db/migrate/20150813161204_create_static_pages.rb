class CreateStaticPages < ActiveRecord::Migration
  def change
    create_table :static_pages do |t|
      t.string :name, index: true
      t.text :content, index: true
      t.string :descriptor, index: true
    end
  end
end
