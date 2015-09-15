class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]


  def index
    @products = Product.all
  end


  def show

    @seller = @product.seller
    @seller_reviews = @seller.seller_reviews.all

    @mini_cart = MiniCart.new

    @product_attacments = ProductAttacment.where(product_id: @product.id)
    @related_products = @product.product_category.products.take(6)
    @seller_products = @product.seller.products.take(6)

    #question
    @question = ProductQuestion.new(params[:question])
    @question.product_id = @product.id
    #sidebar data
    @sidebar_product_categories = ProductCategory.where(to_category_sidebar: true)
    @sidebar_products           = Product.where(to_category_sidebar: true)
    @sidebar_banners            = Banner.where(to_category_sidebar: true)
    @sidebar_hot_products       = Product.where(hot_product: true)
  end

  def search
    @sidebar_product_categories = ProductCategory.where(to_category_sidebar: true)
    @sidebar_products           = Product.where(to_category_sidebar: true)
    @sidebar_banners            = Banner.where(to_category_sidebar: true)
    @sidebar_hot_products       = Product.where(hot_product: true)

  end


  private
  def set_product
    @product = Product.friendly.find(params[:id])
  end

  def product_params
    params[:product]
  end
end
