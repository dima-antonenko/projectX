class AdvertCategory < ActiveRecord::Base
	belongs_to :advert
	belongs_to :product_category

	validates :product_category_id, presence: true
	validates :show_in_products, presence: true
	validates :views, presence: true
	validates :time_days, presence: true
	
end