class AdvertCategory < ActiveRecord::Base
	belongs_to :advert
	belongs_to :product_category

	validates :product_category_id, presence: true
	validates :show_in_products, presence: true
	validates :total_views, presence: true
	validates :time_days, presence: true

	validate :validate_add_to_active_advert, on: :create

	def validate_add_to_active_advert
		errors.add(:advert, "is active") if advert.active?
	end
	
end


=begin
	
+ :total_views
+ :current_views
+ :residue_views

+ :views_in_category
+ :residue_views_in_category

:views_in_category_today
:residue_views_in_category_today 

+ :views_in_product               запланировано показов в товарах всего
+ :residue_views_in_product       остаток показов в товарах

      
:views_in_product_today           запланировано показов на сегодня
:residue_views_in_product_today   остаток показов на сегодня

+ :category_price
+ :total_price
+ :views_in_day - общее кол-во показов в день
+ :active_today
+ :time_days

=end