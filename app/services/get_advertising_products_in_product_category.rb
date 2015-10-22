class GetAdvertisingProductsInProductCategory

  def initialize(product_category_id)
    @advert_categories = AdvertCategory.where(product_category_id: product_category_id,
     active_today_in_category: true).order(:updated_at).take(3)

    @sidebar_products_keys = []
  end

  def check_count_advert_categories
    if @advert_categories.count > 0
      self.get_sidebar_product_keys
      return @sidebar_products_keys
    else
      return false  
    end
  end


  protected


  #добавление первичных ключей в массив и обновление колва просмотров для позиций
  def get_sidebar_product_keys
    @advert_categories.each do |advert_category|
      self.update_views_advert_category(advert_category)
      self.check_status(advert_category)
      @sidebar_products_keys << advert_category.advert.product_id
    end
    return @sidebar_products_keys  
  end

  #обновление количества ежедневных просмотров в категории товаров
  def update_views_advert_category(advert_category)   
      advert_category.residue_views_in_category_today -= 1
      advert_category.views_in_category_today += 1
  end

  #установка статуса "неактивно сегодня" 
  def check_status(advert_category)
    if advert_category.residue_views_in_category_today == 0
      advert_category.active_today_in_category = false
    end  
  end

end
