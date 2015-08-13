class Administrator::SellersController < AdministratorController
  
   before_action :set_seller, only: [:show, :edit, :update, :destroy]

  def index
    @sellers = Seller.all
   
  end

  def edit
    @seller = Seller.find(params[:id])
 
  end

    def new
    @seller = Seller.new    
    end

  # POST /seller
  # POST /seller.json
  def create
    @seller = Seller.create(seller_params)

    respond_to do |format|
      if @seller.save
        format.html { redirect_to '/administrator/seller', notice: 'Информация обновлена' }
        format.json { render :show, status: :created, location: @seller }
      else
        format.html { render :new }
        format.json { render json: @seller.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /seller/1
  # PATCH/PUT /seller/1.json
  def update
    respond_to do |format|
      if @seller.update(seller_params)
        format.html { redirect_to '/administrator/seller', notice: 'Информация обновлена' }
        format.json { render :show, status: :ok, location: @seller }
      else
        format.html { render :edit }
        format.json { render json: @seller.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /seller/1
  # DELETE /seller/1.json
  def destroy
    @seller.destroy
    respond_to do |format|
      format.html { redirect_to '/administrator/seller', notice: 'Информация обновлена' }
      format.json { head :no_content }
    end
  end

  private

  def seller_params
      params.require(:seller).permit(:title, :content, :text, :content, :avatar,
        :seo_title, :seo_description, :seo_keywords, :to_main_page)
  end

  def set_seller
      @seller = Seller.find(params[:id])
    end

end