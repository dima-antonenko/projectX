class SetAdvertStatus

  def initialize(advert_id)
    @advert = Advert.find(advert_id)
    @seller = Seller.find(@advert.seller_id)
  end

  def set_active
    if @advert.total_price < @seller.score
      @seller.score -= @advert.total_price
      @seller.save
      @advert.active = true
      @advert.save
      self.set_active_advert_categories
      return true
    else
      return false
    end  
  end

  def remove_advert

  end

  protected

  def set_active_advert_categories
    @advert.advert_categories.each do |category|
      category.active = true
      category.save
    end
  end

  def set_no_active_advert_categories
    @advert.advert_categories.each do |category|
      category.active = false
      category.save
    end
  end



end

=begin
  установка статуса объявления продавцом
  
  set_active
  если у продавца достаточно денег на счету то объявление становится активным

  
=end
