class AddArchiveFieldToProductQuestion < ActiveRecord::Migration
  def change
  	add_column :product_questions, :archive, :boolean, index: true, default: false
  end
end
