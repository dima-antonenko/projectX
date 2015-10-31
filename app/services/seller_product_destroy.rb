class SellerProductDestroy

	def initialize(product)
    @product = product
	end	


  def destroy_product
    @product.archive = true
    @product.save
    if @product.adverts.count > 0
      self.set_archive_product_adverts
    end   
  end


  protected


  def set_archive_product_adverts
    @product.adverts.each do |advert|
      SetAdvertStatus.new(advert).set_archive
    end  
  end


end