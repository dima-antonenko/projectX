class Product < ActiveRecord::Base
	belongs_to :seller
	belongs_to :product_category

	has_many :product_attachments, inverse_of: :product
	accepts_nested_attributes_for :product_attachments, allow_destroy: true


	mount_uploader :avatar, TestUploader
end