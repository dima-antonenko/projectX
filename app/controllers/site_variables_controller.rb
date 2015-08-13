class SiteVariablesController < ApplicationController
  before_action :set_site_variable, only: [:show, :edit, :update, :destroy]

  # GET /site_variables
  # GET /site_variables.json
  def index
    @site_variables = SiteVariable.all
  end

  # GET /site_variables/1
  # GET /site_variables/1.json
  def show
  end

  # GET /site_variables/new
  def new
    @site_variable = SiteVariable.new
  end

  # GET /site_variables/1/edit
  def edit
  end

  # POST /site_variables
  # POST /site_variables.json
  def create
    @site_variable = SiteVariable.new(site_variable_params)

    respond_to do |format|
      if @site_variable.save
        format.html { redirect_to @site_variable, notice: 'Site variable was successfully created.' }
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
        format.html { redirect_to @site_variable, notice: 'Site variable was successfully updated.' }
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
      format.html { redirect_to site_variables_url, notice: 'Site variable was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_variable
      @site_variable = SiteVariable.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def site_variable_params
      params[:site_variable]
    end
end
