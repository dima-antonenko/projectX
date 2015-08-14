class Administrator::SlidesController < AdministratorController
  
   before_action :set_slide, only: [:show, :edit, :update, :destroy]

  def index
    @slides = Slide.all
    render 'administrator/slides/index'
  end

  def edit
    @slide = Slide.find(params[:id])
    render 'administrator/slides/edit'
    end

    def new
    @slide = Slide.new
    
    end

  # POST /slides
  # POST /slides.json
  def create
    @slide = Slide.create(slide_params)

    respond_to do |format|
      if @slide.save
        format.html { redirect_to '/administrator/sliders', notice: 'Информация обновлена' }
        format.json { render :show, status: :created, location: @slide }
      else
        format.html { render :new }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /slides/1
  # PATCH/PUT /slides/1.json
  def update
    respond_to do |format|
      if @slide.update(slide_params)
        format.html { redirect_to :back, notice: 'Информация обновлена' }
        format.json { render :show, status: :ok, location: @slide }
      else
        format.html { render :edit }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1
  # DELETE /slides/1.json
  def destroy
    @slide.destroy
    respond_to do |format|
      format.html { redirect_to '/administrator/sliders', notice: 'Информация обновлена' }
      format.json { head :no_content }
    end
  end

  private

  def slide_params
      params.require(:slide).permit(:slider_id, :title, :image, :descriptor)
  end

  def set_slide
      @slide = Slide.find(params[:id])
    end

end