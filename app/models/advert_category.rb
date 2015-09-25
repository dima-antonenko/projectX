class AdvertCategory < ActiveRecord::Base
	belongs_to :advert
	belongs_to :product_category
end