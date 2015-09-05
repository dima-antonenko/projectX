class MiniCartsController < ApplicationController
  before_action :set_mini_cart, only: [:show, :edit, :update, :destroy]

  def new
    @mini_cart = MiniCart.new
  end

  
  def create
    @mini_cart = MiniCart.new(mini_cart_params)

    respond_to do |format|
      if @mini_cart.save
        format.html { redirect_to :back, notice: 'Заказ оформлен' }
      else
        format.html { redirect_to :back, notice: 'Произошла ошибка' }
      end
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mini_cart
      @mini_cart = MiniCart.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mini_cart_params
      params[:mini_cart].permit(:name, :email, :phone)
    end
end
