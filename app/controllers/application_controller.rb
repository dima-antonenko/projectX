class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :minicart_in_head, :menus
  protect_from_forgery with: :exception

  def minicart_in_head
    if session[:cart_id]
      @minicart =  Cart.find(session[:cart_id])
      @cart_url = "/carts/#{@minicart.id}"
    end
  end

  def menus
    @main_menu = Menu.where(descriptor: "main_menu").first.menu_items
  end
end
