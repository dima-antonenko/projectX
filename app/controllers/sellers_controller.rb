class SellersController < ApplicationController
  before_filter :authenticate_seller!

  layout "seller"

  def after_sign_in_path_for(resource)
   	seller_root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    request.referrer
  end

  def dashboard
  	render "layouts/seller/dashboard"
  end
  
end