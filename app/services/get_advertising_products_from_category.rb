class GetAdvertisingProducts

  def initialize(product_category_id, place)
    @advert_positions = AdvertPosition.where(product_category_id: product_category_id, place: place,  active_today: true)
    @product_keys = []
    @advertising_products
  end

  def get_products
    if @advert_positions.count > 0
      @product_keys = self.get_keys
      @advertising_products = Product.where(id: @product_keys)
      return @advertising_products
    else
      return false
    end
  end


  protected


  def get_keys
    @advert_positions.each do |advert_position|
      self.update_views_advert_position(advert_position)
      @product_keys << advert_positions.product_id
    end
  end

  def update_views_advert_position(advert_position)
    advert_position.views_today -= 1
    if advert_position.views_today == 0
      advert_position.active_today = false
    end
    advert_position.save
  end

end
