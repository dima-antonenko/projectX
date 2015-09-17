class Post < ActiveRecord::Base
	  extend FriendlyId
     friendly_id :slug, use: :slugged
	belongs_to :post_category
	mount_uploader :avatar, PostAvatarUploader
end
