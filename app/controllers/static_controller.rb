class StaticController < ApplicationController
  def home
    @slider = Slider.where(descriptor: "main_slider").first
    @products = Product.where(to_main_page: true).take(25).each_slice(5)
    @product_category = ProductCategory.where(to_main_page: true).first
    @product_category_best_seller_products = @product_category.products.order(:count_sales).take(6)
    @product_category_most_viewed_products = @product_category.products.order(:count_views).take(6)
    @product_category_news_products = @product_category.products.order(:created_at).take(6)
    @product_category_hot_products = @product_category.products.where(show_in_category_block_to_main_page: true).take(6)
    @categories_list = ProductCategory.where(to_main_page_product_categories_list: true,
     product_category: nil).order(:to_main_page_product_categories_list).take(8)
    @posts = Post.where(to_main_page: true).take(4)
  end

  def seller_edit
  	
  end

  def seller_pay
  	
  end
end