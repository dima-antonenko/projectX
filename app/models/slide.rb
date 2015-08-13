class Slide < ActiveRecord::Base
	belongs_to :slider
	mount_uploader :image, SlideImageUploader
end
