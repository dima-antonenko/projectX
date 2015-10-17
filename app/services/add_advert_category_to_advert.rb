class AddAdvertCategoryToAdvert

  attr_accessor :advert_category_id

  def initialize(advert_category_id)
    @advert_category  = AdvertCategory.find(advert_category_id)
    @product_category = ProductCategory.find(@advert_category.product_category_id)
    @product_category_price = @product_category.price_advert
    @margin_in_product_page = @product_category.margin_product_one_view
  end



  def update_params
    self.copy_category_price
    self.calc_views
    self.set_residue_views
    self.calc_advert_category_price
    @advert_category.save
    UpdateAdvertForAddAdvertCategory.new(@advert_category).add_advert_category
  end


  protected


  def copy_category_price
    @advert_category.category_price = @product_category_price
  end

  def calc_views
    if @advert_category.show_in_products == true
      @advert_category.views_in_category = @advert_category.total_views / 2
      @advert_category.views_in_product  = @advert_category.total_views - @advert_category.views_in_category
    else
      @advert_category.views_in_category = @advert_category.total_views
    end
  end

  def set_residue_views
    @advert_category.residue_views             = @advert_category.total_views
    @advert_category.residue_views_in_category = @advert_category.views_in_category
    @advert_category.residue_views_in_product  = @advert_category.views_in_product
  end

  

  def calc_advert_category_price
    @advert_category.total_price = @product_category_price * @advert_category.total_views
    if @advert_category.show_in_products == true
      @advert_category.total_price += @margin_in_product_page
    end
  end





end
