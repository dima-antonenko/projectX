class ProductAttacment < ActiveRecord::Base
	belongs_to :product
	mount_uploader :image, AttacmentUploader
end
