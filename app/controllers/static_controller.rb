class StaticController < ApplicationController
  def home
    @slider = Slider.where(descriptor: "main_slider").first
    @products = Product.where(to_main_page: true).take(25).each_slice(5)
  end

  def seller_edit
  	
  end

  def seller_pay
  	
  end
end