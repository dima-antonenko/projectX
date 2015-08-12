class Administrator::PostCategoriesController < AdministratorController
  
   before_action :set_post_category, only: [:show, :edit, :update, :destroy]

  def index
    @post_categories = PostCategory.all
    render 'administrator/post_categories/index'
  end

  def edit
    @post_category = PostCategory.find(params[:id])
    render 'administrator/post_categories/edit'
  end

    def new
      @post_category = PostCategory.new
    end

  # POST /product_categories
  # POST /product_categories.json
  def create
    @post_category = PostCategory.new(post_category_params)

    respond_to do |format|
      if @post_category.save
        format.html { redirect_to '/administrator/post_categories', notice: 'Product category was successfully created.' }
        format.json { render :index, status: :created, location: @post_category }
      else
        format.html { render :new }
        format.json { render json: @post_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /product_categories/1
  # PATCH/PUT /product_categories/1.json
  def update
    respond_to do |format|
      if @post_category.update(post_category_params)
        format.html { redirect_to '/administrator/post_categories', notice: 'Product category was successfully updated.' }
        format.json { render :show, status: :ok, location: @post_category }
      else
        format.html { render :edit }
        format.json { render json: @product_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /product_categories/1
  # DELETE /product_categories/1.json
  def destroy
    @post_category.destroy
    respond_to do |format|
      format.html { redirect_to '/administrator/post_categories', notice: 'Product category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def post_category_params
      params.require(:post_category).permit(:title, :description,
        :meta_title, :meta_description, :meta_keywords,  :avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at,
        :avatar)
  end

  def set_post_category
      @post_category = PostCategory.find(params[:id])
  end

end