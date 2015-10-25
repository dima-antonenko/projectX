class Seller < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	has_many :products
	has_many :adverts
	has_many :seller_reviews

	#mount_uploader :avatar, SellerAvatarUploader
end