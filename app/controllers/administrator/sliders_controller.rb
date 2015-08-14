class Administrator::SlidersController < AdministratorController
  
   before_action :set_slider, only: [:show, :edit, :update, :destroy]

  def index
    @sliders = Slider.all
    render 'administrator/sliders/index'
  end

  def edit
    @slider = Slider.find(params[:id])
    render 'administrator/sliders/edit'
    end

    def new
    @slider = Slider.new
    
    end

  # POST /sliders
  # POST /sliders.json
  def create
    @slider = Slider.create(slider_params)

    respond_to do |format|
      if @slider.save
        format.html { redirect_to '/administrator/sliders', notice: 'Информация обновлена' }
        format.json { render :show, status: :created, location: @slider }
      else
        format.html { render :new }
        format.json { render json: @slider.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sliders/1
  # PATCH/PUT /sliders/1.json
  def update
    respond_to do |format|
      if @slider.update(slider_params)
        format.html { redirect_to '/administrator/sliders', notice: 'Информация обновлена' }
        format.json { render :show, status: :ok, location: @slider }
      else
        format.html { render :edit }
        format.json { render json: @slider.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sliders/1
  # DELETE /sliders/1.json
  def destroy
    @slider.destroy
    respond_to do |format|
      format.html { redirect_to '/administrator/sliders', notice: 'Информация обновлена' }
      format.json { head :no_content }
    end
  end

  private

  def slider_params
      params.require(:slider).permit(:name, :descriptor)
  end

  def set_slider
      @slider = Slider.find(params[:id])
    end

end