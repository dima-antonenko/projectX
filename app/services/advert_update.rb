class AdvertUpdate
  attr_accessor :advert_id

  def initialize(advert_id, category_total_price, category_total_views)
    @advert                     = Advert.find(advert_id)
    @adert_category_total_price = category_total_price
    @adert_category_total_views = category_total_views
  end

  def update_add_category
    @advert.total_price += @adert_category_total_price
    @advert.total_views += @adert_category_total_views
    @advert.save
  end

  def update_remove_category
    @advert.total_price -= @adert_category_total_price
    @advert.total_views -= @adert_category_total_views
    @advert.save
  end

end
