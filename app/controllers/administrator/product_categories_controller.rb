class Administrator::ProductCategoriesController < AdministratorController

  before_action :set_product_category, only: [:edit, :update, :destroy, :delete]


  def index
    @product_categories = ProductCategory.paginate(:page => params[:page], :per_page => 10)
    render '/administrator/product_categories/index'
  end

  def edit
    @product_category = ProductCategory.find(params[:id])
    @product_category_attachments = ProductCategoryAttacment.where(product_category_id: @product_category.id)
   
  end

  # GET /product_categorys/new
  def new
    @product_category = ProductCategory.new
    
    # @product_category.product_category_attachments.build
  end



  # POST /product_categorys
  # POST /product_categorys.json
  def create
    @product_category = ProductCategory.new(product_category_params)

    @product_category.assign_attributes(product_category_params)

    respond_to do |format|
      if @product_category.save

        if params[:images] != nil
          params[:images].each do |image|
            ProductCategoryAttacment.create(product_category_id: @product_category.id, image: image)
          end
        end
        format.html { redirect_to edit_administrator_product_category_path(@product_category) , notice: 'Проект добавлен' }
        format.json { render :show, status: :created, location: @product_category }
      else
        format.html { render :new }
        format.json { render json: @product_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /product_categorys/1
  # PATCH/PUT /product_categorys/1.json
  def update
    @product_category = ProductCategory.find(params[:id])
    @product_category.assign_attributes(product_category_params)

     

    respond_to do |format|
      if @product_category.save
        if params[:images] != nil
          params[:images].each do |image|
            ProductCategoryAttacment.create(product_category_id: @product_category.id, image: image)
          end
        end

        format.html { redirect_to :back , notice: 'Информация обновлена' }
        format.json { render :index, status: :ok, location: @product_category }
      else
        format.html { render :update }
        format.json { render json: @product_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /product_categorys/1
  # DELETE /product_categorys/1.json
  def destroy
    @product_category.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Проект удален' }
      format.json { head :no_content }
    end
  end

  private

  def product_category_params
    params.require(:product_category).permit(:avatar, :name, :description, :avatar, :to_main_page, :product_category_id,
      :seo_title, :seo_description, :seo_keywords)

  end

  def set_product_category
    @product_category = ProductCategory.find(params[:id])
  end

end
