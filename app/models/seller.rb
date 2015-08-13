class Seller < ActiveRecord::Base
	has_many :products
	mount_uploader :avatar, SellerAvatarUploader
end