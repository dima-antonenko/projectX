class Site::AdvertsController < SiteController

  def get_adverts_product_categories(category_id)
    @product_category = ProductCategory.find(category_id)
    @stiring = "this is catgory - #{@product_category.name}"
  end

end