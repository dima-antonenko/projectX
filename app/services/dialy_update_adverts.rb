class DialyUpdateAdverts

  attr_accessor :advert_category

  def intialize(advert_category)
    @advert_category = advert_category
  end


  def update_advert_category_views_today
    self.calc_views_in_category_today
    @advert_category.current_views_in_category_today = 0
    @advert_category.residue_views_in_category_today = @advert_category.views_in_category_today

    if @advert_category.show_in_product == true
      self.calc_views_in_product_today
      @advert_category.current_views_in_product_today = 0
      @advert_category.residue_views_in_product_today = @advert_category.views_in_product_today
    end  
  end



  def calc_views_in_category_today
    if @advert_category.views_in_category > @advert_category.views_in_category_in_one_day
      @advert_category.views_in_category -= @advert_category.views_in_category_in_one_day
      @advert_category.views_in_category_today = @advert_category.views_in_category_in_one_day
    elsif @advert_category.views_in_category_in_one_day > @advert_category.views_in_category && @advert_category.views_in_category_in_one_day > 0
      @advert_category.views_in_category_today = @advert_category.views_in_category
      @advert_category.views_in_category = 0
    end
  end

  def calc_views_in_product_today
    if @advert_category.views_in_product_in_one_day < @advert_category.views_in_product
      @advert_category.views_in_product_today = @advert_category.views_in_product_in_one_day
      @advert_category.views_in_product -= @advert_category.views_in_product_in_one_day
    elsif @advert_category.views_in_product < @advert_category.views_in_product_in_one_day && @advert_category.views_in_product > 0
      @advert_category.views_in_product_today = @advert_category.views_in_product
      @advert_category.views_in_product = 0
    end  
  end

end
