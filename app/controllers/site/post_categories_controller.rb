class Site::PostCategoriesController < SiteController
  before_action :set_post_category, only: [:show, :edit, :update, :destroy]

  def show
     #sidebar data
    @sidebar_product_categories = ProductCategory.where(to_category_sidebar: true)
    @sidebar_products           = Product.where(to_category_sidebar: true)
    @sidebar_banners            = Banner.where(to_category_sidebar: true)
    @sidebar_hot_products       = Product.where(hot_product: true)
  end


  private

    def set_post_category
      @post_category = PostCategory.friendly.find(params[:id])
    end
    
end
