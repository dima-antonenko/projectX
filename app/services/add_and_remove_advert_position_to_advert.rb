class AddAndRemoveAdvertPositionToAdvert

  def initialize(advert_position)
    @advert_position = advert_position
    @advert = Advert.find(advert_position.advert_id)
    @product_category = ProductCategory.find(@advert_position.product_category_id)
  end

  def add_position
    self.set_static_data
    self.calc_price
    self.update_advert
    @advert_position.save    
  end

  def remove_position
    @advert.total_price -= @advert_position.total_price
    @advert.total_views -= @advert_position.views
    @advert.save
  end


  protected

  #add_position  

  def set_static_data
    @advert_position.product_id = @advert.product_id
    if @advert_position.place == 'product_category'
      @advert_position.place_price = @product_category.price_show_advert_in_category
    elsif @advert_position.place == 'product'
      @advert_position.place_price = @product_category.price_show_advert_in_product   
    end
  end

  def calc_price
    @advert_position.total_price = @advert_position.place_price * @advert_position.views
  end

  def update_advert
    @advert.total_price += @advert_position.total_price
    @advert.total_views += @advert_position.views
    @advert.save
  end

 
end