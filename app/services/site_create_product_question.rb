class SiteCreateProductQuestion

  def initialize(product_question, product_id)
    @product_question = product_question
    @product =  Product.friendly.find(product_id)
  end

  def change_question
    @product_question.product_id = @product.id
    @product_question.seller_id = @product.seller_id
    @product_question.save
  end

end
