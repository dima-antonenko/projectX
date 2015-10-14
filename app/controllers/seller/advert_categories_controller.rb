class Seller::AdvertCategoriesController < SellerController
  before_action :set_advert_category, only: [:destroy, :set_advert]
  before_action :set_advert, only: [:destroy]


  def new
    @advert_category = AdvertCategory.new
  end

  def create
   @advert_category = AdvertCategory.new(advert_category_params)
   @advert_category.advert_id = params[:advert_id]

    respond_to do |format|
      if @advert_category.save
        AddAdvertCategoryToAdvert.new(@advert_category.id).update_params
        format.html { redirect_to :back, notice: 'success' }
      else
        format.html { redirect_to :back, notice: 'error' }
      end
    end
  end

  

  def destroy
    
    respond_to do |format|
      if @advert.active == false
        UpdateAdvertForAddAdvertCategory.new(@advert_category.id).remove_advert_category
        @advert_category.destroy
        format.html { redirect_to :back, notice: 'Позиция удалена' }
      else
        format.html { redirect_to :back, notice: 'Ошибка, нельзя редактировать активное объявление' }
      end  
    end
    
  end

  private
    def set_advert_category
      @advert_category = AdvertCategory.find(params[:id])
    end

    def set_advert
      @advert = Advert.find(@advert_category.advert_id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def advert_category_params
      params[:advert_category].permit(:product_category_id, :show_in_products, :total_views, :time_days)
    end
end
