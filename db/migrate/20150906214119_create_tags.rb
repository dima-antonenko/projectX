class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :title, index: true
      t.string :slug, index: true
    end
  end
end
