class Sellers::MiniCartsController < SellersController

  before_action :set_mini_cart, only: [:destroy]


  def index
    @mini_carts = MiniCart.where(seller_id: current_seller.id)
  end


  private


  def set_mini_cart
    @mini_cart = MiniCart.find(params[:id])
  end

end
