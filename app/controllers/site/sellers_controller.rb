class Site::SellersController < SiteController
  before_action :set_seller, only: [:show, :edit, :update, :destroy]

  def show
    @products = @seller.products.paginate(:page => params[:page], :per_page => 12)
    @mini_cart = MiniCart.new

    @seller_reviews = @seller.seller_reviews

    #sidebar data
    @sidebar_product_categories = ProductCategory.where(to_category_sidebar: true)
    @sidebar_products           = Product.where(to_category_sidebar: true)
    @sidebar_banners            = Banner.where(to_category_sidebar: true)
    @sidebar_hot_products       = Product.where(hot_product: true)
  end

  private
    def set_seller
      @seller = Seller.find(params[:id])
    end

    def seller_params
      params[:seller]
    end
end
