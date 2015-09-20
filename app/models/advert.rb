class Advert < ActiveRecord::Base
	belongs_to :seller, index: true
end

=begin


integer :product_id,   -- id товара
string  :place_type, default: "product_category" -- тип места, где будет показываться

boolean :show_in_products -- отображать в товарах категории(только для категории)
integer :views, default: 1  -- запланированное кол-во показов     
integer :time_days   -- запланированное время показов
decimal :total_price -- стоимость объявления

integer :current_views -- текущее колво показов
integer :residue_views -- остаток показов  

t.string  :status, default: "processed" -- статус(active, processed, archive)
t.boolean :viewed_admin, default: false -- для счетчика



=end