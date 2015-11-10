class SiteCreateMiniCart

 def initialize(mini_cart, product_id)
   @mini_cart = mini_cart
   @product = Product.friendly.find(product_id)      
 end 


 def create_cart
   @mini_cart.product_id = @product.id
   @mini_cart.seller_id = @product.seller_id
 end


end
