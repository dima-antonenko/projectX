class Administrator::OrdersController < AdministratorController

  before_action :set_order, only: [:edit, :update, :destroy, :delete]


  def index
    @orders = Order.paginate(:page => params[:page], :per_page => 10)
  end


  

  private

  def order_params
    params.require(:order).permit()

  end

  def set_order
    @order = Order.find(params[:id])
  end

end
