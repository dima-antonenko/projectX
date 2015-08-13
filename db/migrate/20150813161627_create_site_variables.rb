class CreateSiteVariables < ActiveRecord::Migration
  def change
    create_table :site_variables do |t|
      t.belongs_to :static_page, index: true
      t.string :name, index: true
      t.text :content, index: true
      t.string :descriptor, index: true
    end
  end
end
