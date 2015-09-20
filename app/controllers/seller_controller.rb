class SellerController < ApplicationController

  before_action :set_seller

  layout "seller"

  def set_seller
    @seller = Seller.first
  end

  def dashboard
    render "layouts/seller/dashboard"
  end

  def seller_edit
  	
  end

  def seller_pays
    
  end
end
