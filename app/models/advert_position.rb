class AdvertPosition < ActiveRecord::Base

	validate :validate_add_to_active_advert, on: :create
	validate :validate_remove_from_active_advert, on: :destroy
	
	belongs_to :advert
	belongs_to :product_category

	validates :product_category_id, presence: true
	validates :place, presence: true
	validates :views, presence: true
	validates :time_days, presence: true


	def validate_add_to_active_advert
		errors.add(:advert, "is active") if advert.active?
	end

	def validate_remove_from_active_advert
		errors.add(:advert, "is active") if advert.active?
	end
end


=begin
	
	product_id
	advert_id
	place 'product_category' / 'product'
	place_price 
	views
	total_price
	views_today
	time_days
	active
	active_today

	place 'product_category' / 'product'
	views
	time_days

=end