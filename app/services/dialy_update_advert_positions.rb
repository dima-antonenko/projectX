class DialyUpdateAdvertPositions

  def initialize
    @advert_positions = AdvertPosition.where(active: true)
  end

  def check_bad_positions
    @advert_positions.each do |advert_position|
      self.add_unused_views(advert_position)
      self.check_empty_positions(advert_position)
      advert_position.save
    end
  end

  def update_data
    @advert_positions = AdvertPosition.where(active_today: true)
    @advert_positions.each do |advert_position|
      self.update_time_days(advert_position)  
    end
  end


  protected


  #check_bad_position

  def add_unused_views(advert_position)
    advert_position.views += advert_position.views_today
  end

  def check_empty_positions(advert_position)
    if advert_position.views == 0
      advert_position.active = false
    else
      advert_position.active_today = true  
    end
  end


  #update_data

  def update_time_days(advert_position)
    advert_position.time_days -= 1
    if advert_position.time_days == 0 and advert_position.views > 0
      advert_position.time_days = 1
    end
  end

  def calc_views_today(advert_position)
    if advert_position.time_days == 1
      advert_position.views_today = advert_position.views
      advert_position.views = 0
    else
      advert_position.views_today = advert_position.views / advert_position.time_days
      advert_position.views -= advert_position.today
    end      
  end

end
