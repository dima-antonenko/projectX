class GetAdvertisingProductsInProduct

  def initialize(product_category_id)
    @advert_categories = AdvertCategory.where(product_category_id: product_category_id, active_today_in_product: true).limit(3)
    @sidebar_product_keys = []
  end

  def check_count_advert_categories

    if @advert_categories.count > 0
      self.get_sidebar_product_keys
      return @sidebar_product_keys
    else
      return false
    end

  end


  protected


  def get_sidebar_product_keys
    @advert_categories.each do |advert_category|
      self.update_advert_category(advert_category)
      self.check_status_advert_category(advert_category)
      @sidebar_product_keys << advert_category.advert.product_id
      advert_category.save      
    end
  end

  def update_advert_category(advert_category)
    advert_category.residue_views_in_product_today -= 1
    advert_category.views_in_product_today += 1
  end

  def check_status_advert_category(advert_category)
    if advert_category.residue_views_in_product_today == 0
      advert_category.active_today_in_product = false
    end  
  end

end
