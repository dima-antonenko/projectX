class Sellers::ProductTagsController < SellersController

  before_action :set_product_tag, only: [:destroy]


  def destroy
    @product_tag.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Информация обновлена' }
    end
  end


  private


  def set_product_tag
    @product_tag = ProductTag.find(params[:id])
  end

end
