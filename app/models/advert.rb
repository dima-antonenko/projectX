class Advert < ActiveRecord::Base
	belongs_to :seller
	has_many :advert_categories
	belongs_to :product
	
	attr_accessor :advert_category_id, :advert_category_show_in_products, :advert_category_views, :advert_category_time_days
end

=begin


integer :product_id,   -- id товара
string  :place_type, default: "product_category" -- тип места, где будет показываться
integer :place_id,  

boolean :show_in_products -- отображать в товарах категории(только для категории)
integer :views, default: 1  -- запланированное кол-во показов     
integer :time_days   -- запланированное время показов
decimal :total_price -- стоимость объявления

integer :current_views -- текущее колво показов
integer :residue_views -- остаток показов  

t.string  :status, default: "processed" -- статус(active, processed, archive)
t.boolean :viewed_admin, default: false -- для счетчика

def get_adverts( place_type, place_type_id)
			
	end


=end