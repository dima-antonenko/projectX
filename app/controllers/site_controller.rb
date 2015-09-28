class SiteController < ApplicationController

  layout "site"

  def get_adverts_in_product_category(category_id)
  	@products = AdvertsInCategory.new(category_id).get_products
  end

end
