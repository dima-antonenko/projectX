class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  # GET /products
  # GET /products.json
  def index
    @products = Product.all
  end

  # GET /products/1
  # GET /products/1.json
  def show

    @seller = @product.seller
    @seller_reviews = @seller.seller_reviews

    @product_attacments = ProductAttacment.where(product_id: @product.id)
    @related_products = @product.product_category.products.take(6)
    @seller_products = @product.seller.products.take(6)

    #question
    @question = ProductQuestion.c(product_id: @product.id)

    #sidebar data
    @sidebar_product_categories = ProductCategory.where(to_category_sidebar: true)
    @sidebar_products           = Product.where(to_category_sidebar: true)
    @sidebar_banners            = Banner.where(to_category_sidebar: true)
    @sidebar_hot_products       = Product.where(hot_product: true)
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params[:product]
    end
end
