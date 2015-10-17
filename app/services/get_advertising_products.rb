class GetAdvertisingProducts

  def initialize(product_category_id)
    @advert_categories = AdvertCategory.where(product_category_id: product_category_id, active: true,
                                              archive: false, active_today: true).order(:updated_at).take(3)

    @sidebar_products_keys = []
  end


  def get_sidebar_products_in_category
    if @advert_categories > 0
      self.get_sidebar_products_category
      @sidebar_products = Product.where(product_id: @sidebar_product_keys)
    else
      return false
    end
  end


  def get_sidebar_products_in_product
    if @advert_categories > 0
      self.get_sidebar_products_product
      @sidebar_products = Product.where(product_id: @sidebar_product_keys)
    else
      return false
    end
  end



  protected

  #update data from advert to show in product category

  def get_keys_product_category
    @advert_categories.each do |advert_category|
      @sidebar_products_keys << advert_category.id
      self.update_views_today_in_advert_category_product_category(advert_category)
      advert_category.save
    end
  end


  def update_views_today_in_advert_category_product_category(advert_category)
    if advert_category.views_in_category_today == 1
      advert_category.active_today = false
    end
    advert_category.decrement(:residue_views_in_category_today, 1)
    advert_category.increment!(:current_views_in_category_today, 1)
  end

  #update data from advert to show in product category

  def get_keys_product
    @advert_categories.each do |advert_category|
      @sidebar_products_keys << advert_category.id
      self.update_views_today_in_advert_category_product(advert_category)
      advert_category.save
    end
  end


  def update_views_today_in_advert_category_product(advert_category)
    if advert_category.views_in_product_today == 1
      advert_category.active_today = false
    end
    advert_category.decrement(:residue_views_in_product_today, 1)
    advert_category.increment!(:current_views_in_product_today, 1)
  end


end
