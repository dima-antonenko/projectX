class Site::AdvertCategoriesController < SiteController
  before_action :set_advert_category, only: [:show, :edit, :update, :destroy]

  # GET /advert_categories
  # GET /advert_categories.json
  def index
    @advert_categories = AdvertCategory.all
  end

  # GET /advert_categories/1
  # GET /advert_categories/1.json
  def show
  end

  # GET /advert_categories/new
  def new
    @advert_category = AdvertCategory.new
  end

  # GET /advert_categories/1/edit
  def edit
  end

  # POST /advert_categories
  # POST /advert_categories.json
  def create
    @advert_category = AdvertCategory.new(advert_category_params)
    @advert_category.advert_id = params[:advert_id]

    respond_to do |format|
      if @advert_category.save
        AddAdvertCategory.new(@advert_category.id).update_params
        format.html { redirect_to :back, notice: 'success' }
      else
        format.html { redirect_to :back, notice: 'error' }
      end
    end
  end

  # PATCH/PUT /advert_categories/1
  # PATCH/PUT /advert_categories/1.json
  def update
    respond_to do |format|
      if @advert_category.update(advert_category_params)
        format.html { redirect_to @advert_category, notice: 'Advert category was successfully updated.' }
        format.json { render :show, status: :ok, location: @advert_category }
      else
        format.html { render :edit }
        format.json { render json: @advert_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /advert_categories/1
  # DELETE /advert_categories/1.json
  def destroy
    @advert = Advert.find(@advert_category.advert_id)


    @advert_category.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Позиция удалена' }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_advert_category
      @advert_category = AdvertCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def advert_category_params
      params[:advert_category].permit(:product_category_id, :show_in_products, :views, :time_days)
    end
end
