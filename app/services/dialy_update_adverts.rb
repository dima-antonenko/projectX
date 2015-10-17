class DialyUpdateAdverts

  def initialize
    @active_advert_categories = AdvertCategory.where(active: true)
  end

  #проверка всех позиций на пустоту
  def check_empty
    @active_advert_categories.each do |advert_category|
      if advert_category.residue_views_in_category == 0 and advert_category.residue_views_in_category_today == 0 and advert_category.residue_views_in_product == 0 and advert_category.residue_views_in_product_today == 0
        advert_category.active = false
        advert_category.archive = true
        advert_category.save
      end
    end
  end

  #добавление непросмотренных позиций за вчера в общий остаток
  def add_yesterday_residue_views
    @active_advert_categories.each do |advert_category|
      if advert_category.residue_views_in_category > 0
        advert_category.residue_views_in_category += advert_category.residue_views_in_category_today
      end
      if advert_category.residue_views_in_product_today > 0
        advert_category.residue_views_in_product += advert_category.residue_views_in_product_today
      end
      advert_category.save
    end
  end

  #расчет количества показов в день
  def calc_residue_views_today_category_and_product
    @active_advert_categories.each do |advert_category|
      self.add_residue_views_yesterday(advert_category)
      self.calc_views_today_category(advert_category)
      self.calc_views_today_product(advert_category)
      self.calc_residue_views(advert_category)
      advert_category.save
    end
  end

  #протестировать на остаток показа по дням
  #Декрементировать если больше 1
  #оставить 1 если есть неиспользуемые
  #установить active_today

  protected

  #добавление в общий список остатков показа за прошлый день
  def add_residue_views_yesterday(advert_category)
    if advert_category.residue_views_in_product_today > 0
      advert_category.residue_views_in_product += advert_category.residue_views_in_product_today
    end

    if advert_category.residue_views_in_category_today > 0
      advert_category.residue_views_in_category += advert_category.residue_views_in_category_today
    end
  end

  #вычисление плана показ на сегодня и остатка в категории
  def calc_views_today_category(advert_category)
    advert_category.residue_views_in_category_today = advert_category.residue_views_in_category / advert_category.residue_time_days
    if advert_category.residue_time_days == 1
      advert_category.residue_views_in_category = 0
    elsif advert_category.residue_time_days > 1
      advert_category.residue_views_in_category -= advert_category.residue_views_in_category_today  
    end  
  end

  #вычисление плана показ на сегодня и остатка в карточке
  def calc_views_today_product(advert_category)
    advert_category.residue_views_in_product_today  = advert_category.residue_views_in_product / advert_category.residue_time_days
    if advert_category.time_days == 1
      advert_category.residue_views_in_product = 0
    elsif advert_category.residue_views_in_product > 1
      advert_category.residue_views_in_product -= advert_category.residue_views_in_product_today
    end  
  end

  #вычисление остатка времени показа
  def calc_residue_views(advert_category)
    if advert_category.residue_time_days > 1
      advert_category.residue_time_days -= 1
    elsif advert_category.residue_time_days == 1
      if advert_category.residue_views_in_category != 0 && advert_category.residue_views_in_category_today != 0 && advert_category.residue_views_in_product != 0 && advert_category.residue_views_in_product_today == 0
        advert_category.residue_time_days = 1    
      end  
    end      
  end
  
end