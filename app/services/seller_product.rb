class SellerProduct

  def initialize(product, params, current_seller)
    @params = params
    @product = product
    @current_seller = current_seller
  end


  def create_product
    self.set_seller
    self.add_images
    self.add_tags
  end

  def update_product
    self.set_seller
    self.add_images
    self.add_tags
  end


  protected


  #create_product

  def set_seller
    @product.seller_id = @current_seller.id
  end

  def add_images
    if @params[:images]
      @params[:images].each do |image|
        if @product.product_attacments.count < 11
          ProductAttacment.create(product_id: @product.id, image: image)
        end
      end 
    end   
  end

  def add_tags
    if @params[:product][:tags_list]
      @params[:product][:tags_list].each do |id|
        if @product.tags.count < 16
          ProductTag.create(product_id: @product.id, tag_id: id)
        end  
      end
    end  
  end


end
