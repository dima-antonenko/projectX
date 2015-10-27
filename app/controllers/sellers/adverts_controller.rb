  class Sellers::AdvertsController < SellersController

  before_action :set_advert, only: [:show, :edit, :update, :destroy, :set_active]


  def index
    @adverts            = Advert.all
    @active_adverts     = Advert.where(active: true)
    @no_active_adverts  = Advert.where(active: false)
    @archive_adverts     = Advert.where(archive: true)
    @advert             = Advert.new

    @product_categories = ProductCategory.all
    @products           = current_seller.products.all

  end

  def edit
    @advert = Advert.find(params[:id])
    @product_categories = ProductCategory.all.collect {|category| ["#{category.name}    цена показа в категории: #{category.price_show_advert_in_category}$, цена за показ в товарах: #{category.price_show_advert_in_product}$", category.id ]}
    @advert_positions = AdvertPosition.where(advert_id: @advert.id)
    @product = Product.find(@advert.product_id)
    @product_category = @product.product_category
    @advert_position = AdvertPosition.new

    @current_seller = current_seller

    render 'sellers/adverts/edit'
  end

  def new
    @advert = Advert.new
  end

  def create
    @advert = Advert.create(product_id: params[:advert][:product_id], seller_id: current_seller.id)

    respond_to do |format|
      if @advert.save
        format.html { redirect_to edit_sellers_advert_path(@advert), notice: 'Информация обновлена' }
      else
        format.html { render :new }
      end
    end
  end


  def set_active
    respond_to do |format|
      if SetAdvertStatus.new(@advert).set_active == true
        format.html { redirect_to :back, notice: 'Объявление поставлено в очередь' }
      else
        format.html { redirect_to :back, notice: 'Ошибка, на Вашем счету не достаточно средств' }
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

end
