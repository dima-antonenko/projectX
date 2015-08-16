class StaticController < ApplicationController
  def home
    @slider = Slider.where(descriptor: "main_slider").first
  end

  def seller_edit
  	
  end

  def seller_pay
  	
  end
end