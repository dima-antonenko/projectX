class SiteCalcOrderTotalPrice

  def initialize(order)
    @order = order
  end


  def calc_price
    @order.line_items.each do |item|
      @order.total_price += item.total_price
    end
    @order.save
  end


end
