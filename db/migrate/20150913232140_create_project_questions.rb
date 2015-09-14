class CreateProjectQuestions < ActiveRecord::Migration
  def change
    create_table :product_questions do |t|
      t.belongs_to :product, index: true
      t.string :name, index: true
      t.string :email, index: true
      t.string :phone, index: true
      t.string :skype, index: true
      t.boolean :viewed, default: false, index: true
      t.text :question, index: true 
      t.timestamps null: false
    end
  end
end
