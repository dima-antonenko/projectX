class Seller < ActiveRecord::Base
	has_many :products
	has_many :seller_reviews
	mount_uploader :avatar, SellerAvatarUploader
end