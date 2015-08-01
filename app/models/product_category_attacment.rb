class ProductCategoryAttacment < ActiveRecord::Base
	belongs_to :product_category
	mount_uploader :image, ProductCategoryAttacmentUploader
end
