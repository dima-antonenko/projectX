class DialyUpdateAdverts

  def initialize
    @active_adverts = Advert.where(active: true) 
  end

  def check_empty_adverts
    @active_adverts.each do |advert|
      if advert.advert_positions.where(active: true).coutn == 0
        advert.update_attribute(:active, false)
        self.set_status_archive_advert_positions(advert)
      end  
    end  
  end


  protected

  def set_status_archive_advert_positions(advert)
    advert.advert_positions.each do |advert_position|
      advert_position.update_attribute(:archive, true)
      advert_position.update_attribute(:active, false)      
    end  
  end
end