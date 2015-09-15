class TagsController < ApplicationController
  before_action :set_tag, only: [:show, :edit, :update, :destroy]

  def show
    @products = @tag.products.all.paginate(:page => params[:page], :per_page => 12)
    @mini_cart = MiniCart.new

    #sidebar data
    @sidebar_product_categories = ProductCategory.where(to_category_sidebar: true)
    @sidebar_products           = Product.where(to_category_sidebar: true)
    @sidebar_banners            = Banner.where(to_category_sidebar: true)
    @sidebar_hot_products       = Product.where(hot_product: true)
  end

  private
    def set_tag
      @tag = Tag.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tag_params
      params[:tag]
    end
end
