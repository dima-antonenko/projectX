  class Seller::AdvertsController < SellerController

  before_action :set_advert, only: [:show, :edit, :update, :destroy, :set_active]
  before_action :set_seller, only: [:index, :edit, :update]


  def index
    @adverts            = Advert.all
    @active_adverts     = Advert.where(active: true)
    @arhive_adverts     = Advert.where(active: false)
    @advert             = Advert.new

    @product_categories = ProductCategory.all
    @products           = @seller.products.all

  end

  def edit
    @advert = Advert.find(params[:id])
    @product_categories = ProductCategory.all.collect {|category| ["#{category.name}    цена: #{category.price_advert}$, надбавка за показ в товарах: #{category.price_advert}$", category.id ]}
    @advert_categories = AdvertCategory.where(advert_id: @advert.id)
    @product = Product.find(@advert.product_id)
    @product_category = @product.product_category
    @advert_category = AdvertCategory.new

    @current_seller = Seller.find(@advert.seller_id)

    render 'seller/adverts/edit'
  end

  def new
    @advert = Advert.new
  end

  def create
    @seller = Seller.first
    @advert = Advert.create(product_id: params[:advert][:product_id], seller_id: @seller.id)

    respond_to do |format|
      if @advert.save
        format.html { redirect_to edit_seller_advert_path(@advert), notice: 'Информация обновлена' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    #@advert.assign_attributes(advert_params)
    respond_to do |format|
    if @advert.save
        format.html { redirect_to :back, notice: 'Информация обновлена' }
      else
        format.html { redirect_to :back, notice: 'Заполнены не все данные'}
      end
    end
  end

  def destroy
    @advert.destroy
    respond_to do |format|
      format.html { redirect_to '/seller/adverts', notice: 'Объявление удалено' }
    end
  end

  def set_active
    respond_to do |format|
      if SetAdvertStatus.new(@advert.id).set_active == true
        format.html { redirect_to :back, notice: 'Объявление поставлено в очередь' }
      else
        format.html { redirect_to :back, notice: 'Ошибка' }
      end  
    end
  end


  private

  def advert_params
    params.require(:advert).permit()
  end

  def set_advert
    @advert = Advert.find(params[:id])
  end

  def set_seller
    @seller = Seller.first
  end

end
