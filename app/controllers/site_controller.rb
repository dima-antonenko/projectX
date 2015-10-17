class SiteController < ApplicationController

  layout "site"

  

  before_action :minicart_in_head, :menus

  def minicart_in_head
    if session[:cart_id]
      @minicart =  Cart.find(session[:cart_id])
      @cart_url = "/carts/#{@minicart.id}"
    end
  end

  def menus
    @main_menu = Menu.where(descriptor: "main_menu").first.menu_items
    @footer_menu0 = Menu.where(descriptor: "footer_menu0").first
    @footer_menu1 = Menu.where(descriptor: "footer_menu1").first
    @footer_menu2 = Menu.where(descriptor: "footer_menu2").first
    @footer_menu3 = Menu.where(descriptor: "footer_menu3").first

  end

end
