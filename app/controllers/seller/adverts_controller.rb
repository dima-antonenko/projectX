class Seller::AdvertsController < SellerController

  before_action :set_advert, only: [:show, :edit, :update, :destroy]
  before_action :set_seller, only: [:index, :edit, :update]


  def index
    @adverts = Advert.all
    @active_adverts = Advert.where(active: true)
    @arhive_adverts = Advert.where(active: false)
    @advert = Advert.new

    @product_categories = ProductCategory.all
    @products = @seller.products.all
    

  end

  def edit
    @advert = Advert.find(params[:id])
    @product_categories = ProductCategory.all.collect {|category| ["#{category.name}    цена: #{category.price_advert}$, надбавка за показ в товарах: #{category.price_advert}$", category.id ]}
    @advert_categories = AdvertCategory.where(advert_id: @advert.id)
    @product = Product.find(@advert.product_id)
    @product_category = @product.product_category
    render 'seller/adverts/edit'
  end

  def new
    @advert = Advert.new

  end

  # POST /adverts
  # POST /adverts.json
  def create
    @advert = Advert.create(product_id: params[:advert][:product_id])

    respond_to do |format|
      if @advert.save
        format.html { redirect_to edit_seller_advert_path(@advert), notice: 'Информация обновлена' }
      else
        format.html { render :new }
        format.json { render json: @advert.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /adverts/1
  # PATCH/PUT /adverts/1.json
  def update

    #@advert.assign_attributes(advert_params)


    if params[:advert][:advert_category_id] != "" && params[:advert][:advert_category_views] != "" && params[:advert][:advert_category_time_days] != ""

      @product_category = ProductCategory.find(params[:advert][:advert_category_id])
      @advert_category = AdvertCategory.new(product_category_id: params[:advert][:advert_category_id],
                            advert_id: @advert.id ,
                            show_in_products: params[:advert][:advert_category_show_in_products],
                            views: params[:advert][:advert_category_views],
                            time_days: params[:advert][:advert_category_time_days],
                            residue_views: params[:advert][:advert_category_views],

                            category_price: @category_price,
                            )
      @advert_category.views_in_day = @advert_category.views / @advert_category.time_days
      @advert_category.category_price = @product_category.price_advert
      @advert_category.total_price = @advert_category.category_price * params[:advert][:advert_category_views].to_i

      if params[:advert][:advert_category_show_in_products] == "true"
        @advert_category.total_price +=  @product_category.margin_product_one_view
      end

      if @advert_category.show_in_products == true
        @advert_category.residue_views_in_product  = @advert_category.views / 2
        @advert_category.residue_views_in_category = @advert_category.views - @advert_category.residue_views_in_product
      else
        @advert_category.residue_views_in_category = @advert_category.views
        @advert_category.residue_views_in_product  = 0
      end 
       
      @advert_category.active = true  
      @advert_category.save


     @advert.total_price += @advert_category.total_price
     @advert.total_views += @advert_category.views
     @advert.active = true if @advert.active == false
     @advert.save
    
    end

    respond_to do |format|
    if params[:advert][:advert_category_id] != "" && params[:advert][:advert_category_views] != "" && params[:advert][:advert_category_time_days] != ""
        format.html { redirect_to :back, notice: 'Информация обновлена' }
      else
        format.html { redirect_to :back, notice: 'Заполнены не все данные'}
      end
    end
  end

  # DELETE /adverts/1
  # DELETE /adverts/1.json
  def destroy
    @advert.destroy
    respond_to do |format|
      format.html { redirect_to '/seller/advertrs', notice: 'Объявление удалено' }
      format.json { head :no_content }
    end
  end


  def destroy_advert_category(id)
    @advert_category = AdvertCategory.find(id)
    @advert_category.destroy
    redirect_to :back
  end

  private

  def advert_params
    params.require(:advert).permit( :title, :image, :descriptor,
                                    :advert_category_id, :advert_category_show_in_products, :advert_category_views, :advert_category_time_days)
  end

  def set_advert
    @advert = Advert.find(params[:id])
  end

  def set_seller
    @seller = Seller.first
  end

end
