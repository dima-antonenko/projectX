class Tag < ActiveRecord::Base
	extend FriendlyId
  	 friendly_id :slug, use: :slugged
  has_many :product_tags
  has_many :products, through: :product_tags
end