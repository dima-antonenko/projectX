class Administrator::StaticPagesController < AdministratorController
  
   before_action :set_static_page, only: [:show, :edit, :update, :destroy]

  def index
    @static_pages = StaticPage.all
    render 'administrator/static_pages/index'
  end

  def edit
    @static_page = StaticPage.find(params[:id])
    render 'administrator/static_pages/edit'
    end

    def new
    @static_page = StaticPage.new
    
    end

  # POST /static_pages
  # POST /static_pages.json
  def create
    @static_page = StaticPage.create(static_page_params)

    respond_to do |format|
      if @static_page.save
        format.html { redirect_to '/administrator/static_pages', notice: 'Информация обновлена' }
        format.json { render :show, status: :created, location: @static_page }
      else
        format.html { render :new }
        format.json { render json: @static_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /static_pages/1
  # PATCH/PUT /static_pages/1.json
  def update
    respond_to do |format|
      if @static_page.update(static_page_params)
        format.html { redirect_to '/administrator/static_pages', notice: 'Информация обновлена' }
        format.json { render :show, status: :ok, location: @static_page }
      else
        format.html { render :edit }
        format.json { render json: @static_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /static_pages/1
  # DELETE /static_pages/1.json
  def destroy
    @static_page.destroy
    respond_to do |format|
      format.html { redirect_to '/administrator/static_pages', notice: 'Информация обновлена' }
      format.json { head :no_content }
    end
  end

  private

  def static_page_params
      params.require(:static_page).permit(:name, :content, :descriptor)
  end

  def set_static_page
      @static_page = StaticPage.find(params[:id])
    end

end