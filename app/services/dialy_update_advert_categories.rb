class DialyUpdateAdvertCategories

  def initialize
    @active_advert_categories = AdvertCategory.where(active: true)
  end

  def add_yesterday_residue_and_set_status
    @active_advert_categories.each do |advert_category|
      self.add_yesterday_residue_views(advert_category)
      self.check_active_in_category(advert_category)
      self.check_active_in_product(advert_category)
      self.check_main_active(advert_category)
      advert_category.save
    end
  end

  def calc_views_in_category
    @advert_categories = AdvertCategory.where(active_in_category: true)

    @advert_categories.each do |advert_category|
      self.calc_views_today_category(advert_category)
      self.set_active_today_in_category(advert_category)
      self.calc_residue_views(advert_category)
      advert_category.save
    end
  end

  def calc_views_in_product
    @advert_categories = AdvertCategory.where(active_in_product: true)

    @advert_categories.each do |advert_category|
      self.calc_views_today_product(advert_category)
      self.set_active_today_in_product(advert_category)
      self.calc_residue_views(advert_category)
      advert_category.save
    end
  end



  protected

  #проверка активности
  #добавление остатка просмотров за вчера
  def add_yesterday_residue_views(advert_category)
    if advert_category.residue_views_in_category > 0
      advert_category.residue_views_in_category += advert_category.residue_views_in_category_today
    end
    if advert_category.residue_views_in_product_today > 0
      advert_category.residue_views_in_product += advert_category.residue_views_in_product_today
    end
  end

  #проверка активности в категории
  def check_active_in_category(advert_category)
    if advert_category.residue_views_in_category > 0
      advert_category.active_in_category = true
    elsif advert_category.residue_views_in_category == 0
      advert_category.active_in_category == false
    end
  end

  #проверка активности в карточке товара
  def check_active_in_product(advert_category)
    if advert_category.show_in_product == true and advert_category.residue_views_in_product > 0
      advert_category.active_in_product = true
    elsif advert_category.show_in_product == true and advert_category.residue_views_in_product == 0
      advert_category.active_in_product = false
    end
  end

  #проверка основной активности
  def check_main_active(advert_category)
    if advert_category.active_in_product == false and advert_category.active_in_category == false
      advert_category.active = false
    else
      advert_category.active = true
    end
  end


  #подсчет количества в категории
  #вычисление плана показ на сегодня и остатка в категории
  def calc_views_today_category(advert_category)
    advert_category.residue_views_in_category_today = advert_category.residue_views_in_category / advert_category.residue_time_days
    if advert_category.residue_time_days == 1
      advert_category.residue_views_in_category = 0
    elsif advert_category.residue_time_days > 1
      advert_category.residue_views_in_category -= advert_category.residue_views_in_category_today
    end
  end

  def set_active_today_in_category(advert_category)
    if advert_category.residue_views_in_category_today > 0
      advert_category.active_today_in_category = true
    elsif advert_category.residue_views_in_category_today == 0
      advert_category.active_today_in_category = false
    end
  end


  #подсчет количества в карточке товара
  #вычисление плана показ на сегодня и остатка в карточке товара
  def calc_views_today_product(advert_category)
    advert_category.residue_views_in_product_today  = advert_category.residue_views_in_product / advert_category.residue_time_days
    if advert_category.time_days == 1
      advert_category.residue_views_in_product = 0
    elsif advert_category.residue_views_in_product > 1
      advert_category.residue_views_in_product -= advert_category.residue_views_in_product_today
    end
  end

  def set_active_today_in_product(advert_category)
    if advert_category.residue_views_in_product_today > 0
      advert_category.active_today_in_product = true
    elsif advert_category.residue_views_in_product_today == 0
      advert_category.active_today_in_product = false
    end
  end


  #обновления счетчика остатка дней
  #если есть активные просмотры, но заканчивается время -- остаток времени 1 день
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
