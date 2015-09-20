class Seller < ActiveRecord::Base
	has_many :products, :adverts, :seller_reviews
	mount_uploader :avatar, SellerAvatarUploader
end