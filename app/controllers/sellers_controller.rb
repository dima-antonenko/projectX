class SellersController < ApplicationController
  before_action :set_seller, only: [:show, :edit, :update, :destroy]

  def show
    @products = @seller.products.all
  end

  private
    def set_seller
      @seller = Seller.find(params[:id])
    end

    def seller_params
      params[:seller]
    end
end
