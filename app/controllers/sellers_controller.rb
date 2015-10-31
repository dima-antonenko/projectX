class SellersController < ApplicationController
  before_filter :authenticate_seller!
  before_action :widespread_info

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

  def widespread_info
    @unread_questions = ProductQuestion.where(seller_id: current_seller.id, viewed: false)
  end
  
end