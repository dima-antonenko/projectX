class SiteChangeLineItemQuantity

  def initialize(line_item)
    @line_item = line_item
    @cart = @line_item.cart
  end


  def increment
    @line_item.quantity += 1
    @line_item.save
    SiteCalcLineItemTotalPrice.new(@line_item).calc_total_price
  end


  def decrement

    if @line_item.quantity > 1
      @line_item.quantity -= 1
      @line_item.save
      SiteCalcLineItemTotalPrice.new(@line_item).calc_total_price
    elsif @line_item.quantity == 1
      @line_item.destroy
    end  

  end


end
