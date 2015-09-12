class ProductCategoriesController < ApplicationController
  before_action :set_product_category, only: [:show, :edit, :update, :destroy]

  # GET /product_categories
  # GET /product_categories.json
  def index
    @product_categories = ProductCategory.all
  end

  # GET /product_categories/1
  # GET /product_categories/1.json
  def show
    @products = @product_category.products.paginate(:page => params[:page], :per_page => 12)
    @product_category_attacments =  ProductCategoryAttacment.where(product_category_id: @product_category.id)
    @mini_cart = MiniCart.new


    #sidebar data
    @sidebar_product_categories = ProductCategory.where(to_sidebar: true)
    @sidebar_products           = Product.where(to_sidebar: true)
    @sidebar_banners            = Banner.where(to_sidebar: true)

  end

  
 

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product_category
      @product_category = ProductCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_category_params
      params[:product_category]
    end
end
