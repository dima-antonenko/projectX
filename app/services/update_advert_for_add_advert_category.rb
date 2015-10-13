class UpdateAdvertForAddAdvertCategory
  attr_accessor :advert_category_id

  def initialize(advert_category_id)
    @advert_category = AdvertCategory.find(advert_category_id)
    @advert = Advert.find(@advert_category.advert_id)
  end

  def add_advert_category
    @advert.total_views +=  @advert_category.total_views
    @advert.total_price +=  @advert_category.total_price
    #@advert.total_price +=  20
    @advert.save
  end

  def remove_advert_category
    @advert.total_views -=  @advert_category.total_views
    @advert.total_price -=  @advert_category.total_price
    @advert.save
  end

end
