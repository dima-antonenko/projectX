class AdvertCategory < ActiveRecord::Base


	validates :product_category_id, presence: true
	validates :show_in_products, presence: true
	validates :total_views, presence: true
	validates :time_days, presence: true

	validate :validate_add_to_active_advert, on: :create

	def validate_add_to_active_advert
		errors.add(:advert, "is active") if advert.active?
	end
	
end
