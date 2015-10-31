class AddFieldToProuctQuestion < ActiveRecord::Migration
  def change
  	add_column :product_questions, :seller_id, :integer, index: true
  end
end
