class DialyUpdateAdverts

  def initialize
    @active_advert_categories = AdvertCategory.where(active: true, archive: false)
    @active_adverts = Advert.where(active: true, archive: false)
  end


  def check_empty_categories
    @active_advert_categories.each do |advert_category|
      if @advert_category.residue_views_in_category > 0 && @advert_category.show_in_products == true and @advert_category.residue_views_in_product > 0
        advert_category.archive = true
        advert_category.active  = false
        advert_category.save
      end
    end
  end

  def check_empty_adverts
    @active_adverts.each do |advert|
      if advert.advert_categories.where(active: true).count == 0
        advert.active = false
        advert.archive = true
        advert.save
      end
    end
  end


  def dialy_calc_views_advert_categories
    @active_advert_categories.each do |advert_category|
      self.update_views_in_product_category(advert_category)
      if advert_category.show_in_products == true
        self.update_views_in_product(advert_category)
      end
      advert_category.save
    end
  end

  def upadate_all
    self.check_empty_categories
    self.check_empty_adverts
    self.dialy_calc_views_advert_categories
  end


  protected

  def update_views_in_product_category(advert_category)
    if advert_category.residue_views_in_category > advert_category.views_in_category_in_one_day
      advert_category.residue_views_in_category -= advert_category.views_in_category_in_one_day
      advert_category.views_in_category_today = advert_category.views_in_category_in_one_day
    else
      advert_category.views_in_category_today = advert_category.residue_views_in_category
      advert_category.residue_views_in_category = 0  
    end
    advert_category.residue_views_in_category_today = advert_category.views_in_category_today
  end


  def update_views_in_product(advert_category)
    if advert_category.residue_views_in_product > advert_category.views_in_product_in_one_day
      advert_category.residue_views_in_product -= advert_category.views_in_product_in_one_day
      advert_category.views_in_product_today  = advert_category.views_in_product_in_one_day 
    else
      advert_category.views_in_product_today = advert_category.residue_views_in_product
      advert_category.residue_views_in_product = 0  
    end
    advert_category.residue_views_in_product_today = advert_category.views_in_product_today
  end


end
