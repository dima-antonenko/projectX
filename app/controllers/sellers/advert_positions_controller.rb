class Sellers::AdvertPositionsController < SellersController
  before_action :set_advert_position, only: [:destroy, :set_advert]
  before_action :set_advert, only: [:destroy]


  def new
    @advert_position = AdvertPosition.new
  end

  def create
   @advert_position = AdvertPosition.new(advert_position_params)
   @advert_position.advert_id = params[:advert_id]

    respond_to do |format|
      if @advert_position.save
        AddAndRemoveAdvertPositionToAdvert.new(@advert_position).add_position
        format.html { redirect_to :back, notice: 'success' }
      else
        format.html { redirect_to :back, notice: 'error' }
      end
    end
  end

  

  def destroy
    
    respond_to do |format|
      if @advert.active == false
        AddAndRemoveAdvertPositionToAdvert.new(@advert_position).remove_position
        @advert_position.destroy
        format.html { redirect_to :back, notice: 'Позиция удалена' }
      else
        format.html { redirect_to :back, notice: 'Ошибка, нельзя редактировать активное объявление' }
      end  
    end
    
  end

  private
    def set_advert_position
      @advert_position = AdvertPosition.find(params[:id])
    end

    def set_advert
      @advert = Advert.find(@advert_position.advert_id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def advert_position_params
      params[:advert_position].permit(:product_category_id, :place, :views, :time_days)
    end
end
