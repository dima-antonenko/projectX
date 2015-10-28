class SiteCalcLineItemTotalPrice

  def initialize(line_item)
    @line_item = line_item
    @product = @line_item.product
  end

  def calc_total_price
    @line_item.total_price = @product.price * @line_item.quantity
    @line_item.save
  end

end
