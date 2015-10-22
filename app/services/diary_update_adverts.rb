class DialyUpdateAdverts

  def initialize
    @adverts = Advert.where(active: true)
  end

  def set_active_advert_categories_from_active_adverts 
    @adverts.each do |advert|
      advert.advert_categories.each do |advert_category|
        advert_category.active = true
        advert_category.save
      end  
    end  
  end

end
