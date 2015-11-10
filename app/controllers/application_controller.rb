class ApplicationController < ActionController::Base


  before_action :menus



  def menus
    @main_menu    = Menu.where(descriptor: "main_menu").first.menu_items
    @footer_menu0 = Menu.where(descriptor: "footer_menu0").first
    @footer_menu1 = Menu.where(descriptor: "footer_menu1").first
    @footer_menu2 = Menu.where(descriptor: "footer_menu2").first
    @footer_menu3 = Menu.where(descriptor: "footer_menu3").first
  end

end
