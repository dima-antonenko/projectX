class SetAdvertStatus

  def initialize(advert)
    @advert = advert
    @seller = Seller.find(@advert.seller_id)
  end

  def set_active
    if @seller.score > @advert.total_price
        self.set_active_advert_positions
        self.update_seller_data_for_set_active_advert
        @advert.update_attribute(:active, true)
      return true
    else
      return false
    end
  end

  def set_archive
    self.set_archive_advert_positions
    self.update_seller_data_for_set_archive_advert
    @advert.update_attribute(:active, false)
    @advert.update_attribute(:archive, true)  
  end


  protected

  #set status active

  def set_active_advert_positions
    @advert.advert_positions.each do |advert_position|
      advert_position.update_attribute(:active, true)
    end
  end

  def update_seller_data_for_set_active_advert
    @seller.score -= @advert.total_price
    @seller.save
  end

  #set status archive

  def set_archive_advert_positions
    @advert.advert_positions.each do |advert_position|
      advert_position.update_attribute(:active, false)
      advert_position.update_attribute(:archive, true)     
    end 
  end

  def update_seller_data_for_set_archive_advert
    @seller.score += @advert.total_price
    @seller.save
  end

end
