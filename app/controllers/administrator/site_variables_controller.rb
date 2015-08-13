class Administrator::SiteVariablesController < AdministratorController
  
   before_action :set_site_variable, only: [:show, :edit, :update, :destroy]

  def index
    @site_variables = SiteVariable.all
    render 'administrator/site_variables/index'
  end

  def edit
    @site_variable = SiteVariable.find(params[:id])
    render 'administrator/site_variables/edit'
    end

    def new
    @site_variable = SiteVariable.new
    
    end

  # POST /site_variables
  # POST /site_variables.json
  def create
    @site_variable = SiteVariable.create(site_variable_params)

    respond_to do |format|
      if @site_variable.save
        format.html { redirect_to '/administrator/site_variables', notice: 'Информация обновлена' }
        format.json { render :show, status: :created, location: @site_variable }
      else
        format.html { render :new }
        format.json { render json: @site_variable.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /site_variables/1
  # PATCH/PUT /site_variables/1.json
  def update
    respond_to do |format|
      if @site_variable.update(site_variable_params)
        format.html { redirect_to '/administrator/site_variables', notice: 'Информация обновлена' }
        format.json { render :show, status: :ok, location: @site_variable }
      else
        format.html { render :edit }
        format.json { render json: @site_variable.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /site_variables/1
  # DELETE /site_variables/1.json
  def destroy
    @site_variable.destroy
    respond_to do |format|
      format.html { redirect_to '/administrator/site_variables', notice: 'Информация обновлена' }
      format.json { head :no_content }
    end
  end

  private

  def site_variable_params
      params.require(:site_variable).permit(:title, :content, :text, :content, :avatar,
        :seo_title, :seo_description, :seo_keywords, :to_main_page)
  end

  def set_site_variable
      @site_variable = SiteVariable.find(params[:id])
    end

end