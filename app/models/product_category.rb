class ProductCategory < ActiveRecord::Base
	extend FriendlyId
  	 friendly_id :slug, use: :slugged
	has_many :products

	has_many :product_categories
	belongs_to :product_category

	has_many :product_category_attachments, inverse_of: :product_category
	accepts_nested_attributes_for :product_category_attachments, allow_destroy: true

	mount_uploader :avatar, ProductCategoryAvatarUploader
end
