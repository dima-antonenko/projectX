class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.belongs_to :post_category, index: true
      t.string :name, index: true
      t.text :content, index: true
      t.text :lead, index: true
      t.boolean :to_main_page, index: true, default: false
      t.string :avatar, index: true
      t.string :seo_title, index: true
      t.string :seo_description, index: true
      t.string :seo_keywords, index: true
      t.timestamps null: false
    end
  end
end
