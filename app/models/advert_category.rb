class AdvertCategory < ActiveRecord::Base
	belongs_to :advert
	belongs_to :product_category

	validates :product_category_id, presence: true
	validates :show_in_products, presence: true
	validates :total_views, presence: true
	validates :time_days, presence: true
	
end

=begin
	
+ :total_views
+ :current_views
+ :residue_views

+ :views_in_category
+ :current_views_in_category
+ :residue_views_in_category

:views_in_category_today
+ :views_in_category_in_one_day
:current_views_in_category_today
:residue_views_in_category_today 

+ :views_in_product               запланировано показов в товарах всего
+ :current_views_in_product       показано в товарах
+ :residue_views_in_product       остаток показов в товарах
+ :views_in_product_in_one_day    показов в карт. товара в день
      
:views_in_product_today           запланировано показов на сегодня
:current_views_in_product_today	  показано сегодня
:residue_views_in_product_today   остаток показов на сегодня

+ :category_price
+ :total_price
+ :views_in_day - общее кол-во показов в день
+ :active_today
+ :time_days

=end