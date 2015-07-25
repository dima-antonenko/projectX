class Product < ActiveRecord::Base
	belongs_to :seller
	belongs_to :product_category
end
