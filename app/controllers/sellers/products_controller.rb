class Sellers::ProductsController < SellersController

  before_action :set_product, only: [:edit, :update, :destroy, :delete]


  def index
    @products = Product.where(seller_id: current_seller.id, archive: false).paginate(:page => params[:page], :per_page => 20)

  end

  def edit
    @product = Product.find(params[:id])
    @product_attachments = ProductAttacment.where(product_id: @product.id)
    #@product_tags = @product.tags.all
    @product_tags = ProductTag.where(product_id: @product.id)

  end

  # GET /products/new
  def new
    @product = Product.new  
   # @product_attachments = @product.product_attachments.build
  end

  def create
    @product = Product.new(product_params)
    SellerProduct.new(@product, params, current_seller).create_product

    respond_to do |format|
      if @product.save
        format.html { redirect_to edit_sellers_product_path(@product) , notice: 'Товар добавлен' }
      else
        format.html { redirect_to :back , notice: 'Произошла ошибка' }
      end
    end  
  end

  def update
    @product.assign_attributes(product_params)
    SellerProduct.new(@product, params, current_seller).update_product
     
    respond_to do |format|
      if @product.save
        format.html { redirect_to :back , notice: 'Информация обновлена' }
      else
        format.html { redirect_to :back , notice: 'Произошла ошибка' }
      end
    end  
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    SellerProductDestroy.new(@product).destroy_product
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Товар удален' }
    end
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :short_description, :avatar, :price, :old_price, :avability, :qty, :product_category_id,
     :seo_title, :seo_description, :seo_keywords)

  end

  def set_product
    @product = Product.friendly.find(params[:id])
  end

end
