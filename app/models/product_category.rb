class ProductCategory < ActiveRecord::Base
	has_many :products

	has_many :product_category_attachments, inverse_of: :product_category
	accepts_nested_attributes_for :product_category_attachments, allow_destroy: true

	mount_uploader :avatar, ProductCategoryAvatarUploader
end
