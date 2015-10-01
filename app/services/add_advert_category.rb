class AddAdvertCategory

  attr_accessor :advert_catgory_id

  def initialize(advert_catgory_id)
    @advert_category               = AdvertCategory.find(advert_catgory_id)
    @product_category              = ProductCategory.find(@advert_category.product_category_id)
    @product_category_advert_price = @product_category.price_advert
    @margin_product_one_view       = @product_category.margin_product_one_view
  end

  def update_advert_category_views
    @advert_category.residue_views = @advert_category.views
    @advert_category.views_in_day = @advert_category.views / @advert_category.time_days

    if @advert_category.show_in_products == true
      @advert_category.residue_views_in_product  = @advert_category.views / 2
      @advert_category.residue_views_in_category = @advert_category.views - @advert_category.residue_views_in_product      
    end
  end

  def update_advert_category_prices
    @advert_category.category_price = @product_category_advert_price
    @advert_category.total_price = @product_category_advert_price * @advert_category.views
    if @advert_category.show_in_products == true
       @advert_category.total_price += @margin_product_one_view      
    end
  end

  def update_params
    self.update_advert_category_views
    self.update_advert_category_prices
    @advert_category.save
    #AdvertUpdate.new(@advert_category.advert_id, @advert_category.total_price, @advert_category.views).update_add_category
  end

end
