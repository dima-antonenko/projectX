class Site::ProductCategoryAttacmentsController < SiteController
  before_action :set_product_category_attacment, only: [:show, :edit, :update, :destroy]

  # GET /product_category_attacments
  # GET /product_category_attacments.json
  def index
    @product_category_attacments = ProductCategoryAttacment.all
  end

  # GET /product_category_attacments/1
  # GET /product_category_attacments/1.json
  def show
  end

  # GET /product_category_attacments/new
  def new
    @product_category_attacment = ProductCategoryAttacment.new
  end

  # GET /product_category_attacments/1/edit
  def edit
  end

  # POST /product_category_attacments
  # POST /product_category_attacments.json
  def create
    @product_category_attacment = ProductCategoryAttacment.new(product_category_attacment_params)

    respond_to do |format|
      if @product_category_attacment.save
        format.html { redirect_to :back, notice: 'Product category attacment was successfully created.' }
        format.json { render :show, status: :created, location: @product_category_attacment }
      else
        format.html { render :new }
        format.json { render json: @product_category_attacment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /product_category_attacments/1
  # PATCH/PUT /product_category_attacments/1.json
  def update
    respond_to do |format|
      if @product_category_attacment.update(product_category_attacment_params)
        format.html { redirect_to :back, notice: 'Product category attacment was successfully updated.' }
        format.json { render :show, status: :ok, location: @product_category_attacment }
      else
        format.html { render :edit }
        format.json { render json: @product_category_attacment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /product_category_attacments/1
  # DELETE /product_category_attacments/1.json
  def destroy
    @product_category_attacment.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Информация обновлена' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product_category_attacment
      @product_category_attacment = ProductCategoryAttacment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_category_attacment_params
      params[:product_category_attacment]
    end
end
