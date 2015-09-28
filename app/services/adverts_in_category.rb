class AdvertsInCategory

	attr_accessor :category_id

	def initialize(category_id)
		@category_id = category_id
		@advert_categories = AdvertCategory.where(product_category_id: @category_id).take(3)
		@list_product_keys = []
	end

	def update_advert_categories
		@advert_categories.each do |advert_category|
  			advert_category.views += 1
  			advert_category.save
  		end
	end

	def get_products
		self.update_advert_categories	
		@advert_categories.each do |category|
  			@list_product_keys << category.advert.product_id
  		end
  		@products = Product.where(id: @list_product_keys)  		
  	end
  	


end