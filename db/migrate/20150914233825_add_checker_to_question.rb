class AddCheckerToQuestion < ActiveRecord::Migration
  def change
  	add_column :product_questions, :agree_newsletter, :boolean, index: true, default: true
  end
end
