class Administrator::ProductsController < AdministratorController

  before_action :set_product, only: [:edit, :update, :destroy, :delete]


  def index
    @products = Product.paginate(:page => params[:page], :per_page => 10)
  end

  def edit
    @product = Product.find(params[:id])
    #@product_attachments = ProductAttacment.where(product_id: @product.id)
  end

  # GET /products/new
  def new
    @product = Product.new
    #@product_attachment = @product.product_attachments.build
  end



  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)

    @product.assign_attributes(product_params)

    if params[:product][:some_manager]
      ManagersProduct.create!(product_id: @product.id, manager_id: @product.some_manager )
    end

    respond_to do |format|
      if @product.save

        if params[:images] != nil
          params[:images].each do |image|
            ProductAttacment.create(product_id: @product.id, image: image)
          end
        end
        format.html { redirect_to edit_administrator_product_path(@product) , notice: 'Проект добавлен' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    @product = Product.find(params[:id])
    @product.assign_attributes(product_params)

    if params[:product][:some_manager]
      ManagersProduct.create!(product_id: @product.id, manager_id: @product.some_manager )
    end  

    unless @product.valid?
      Rails.logger.debug @product.errors.full_messages
    end

    respond_to do |format|
      if @product.save
        if params[:images] != nil
          params[:images].each do |image|
            ProductAttacment.create(product_id: @product.id, image: image)
          end
        end

        format.html { redirect_to :back , notice: 'Информация обновлена' }
        format.json { render :index, status: :ok, location: @product }
      else
        format.html { render :update }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Проект удален' }
      format.json { head :no_content }
    end
  end

  private

  def product_params
    params.require(:product).permit()
  end

  def set_product
    @product = Product.find(params[:id])
  end

end
