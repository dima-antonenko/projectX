Product.destroy_all
ProductCategory.destroy_all
Post.destroy_all
Menu.destroy_all
MenuItem.destroy_all

#one category on main page and children
@product_category = ProductCategory.create(name: "Категория 1", to_main_page: true)

10.times do |children_category_counter| 
  ProductCategory.create(name: "Категория: 1-#{children_category_counter}",to_main_page_product_categories_list_order: children_category_counter,
   product_category_id: @product_category.id )
end


# products to main page in product grid
35.times do |i| 
  @product = Product.new(
                    product_category_id: @product_category.id, seller_id: 1, name: "Тестовый товар #{i}", price: 5000, old_price: 8000, sku: "1234",
                     avability: "in_stock",  status: "published", to_main_page: true, count_sales: i, count_views: i * 2,
                      show_in_category_block_to_main_page: true )
  File.open("public/data/demo/products/avatar#{rand(1..8)}.jpg") do |f|
      @product.avatar = f
  end
  @product.save
end

#categories list on main page
9.times do |category_counter| 
  @product_category = ProductCategory.create(name: "Категория #{category_counter}", to_main_page_product_categories_list: true,
                                             to_main_page_product_categories_list_order: category_counter )
  9.times do |children_category_counter|
    ProductCategory.create(name: "Категория: #{category_counter}-#{children_category_counter}", to_main_page_product_categories_list: true,
                           to_main_page_product_categories_list_order: children_category_counter, product_category_id: @product_category.id )
  end
end

#create news to main page
5.times do |i|
  Post.create(name: "Новость #{i}", post_category_id: 1, to_main_page: true, content: "this is content", lead: "this is lead")
end

#create main menu items
@menu = Menu.create(name: "Главное меню", descriptor: "main_menu")
5.times do |i|
  if i == 2
    @menu_item = MenuItem.create(menu_id: @menu.id, name: "Ссылка #{i}", link: "/")
    4.times do |k|
      MenuItem.create(menu_id: @menu.id, name: "Подссылка #{k}", link: "/", menu_item_id: @menu_item.id)
    end
  else
    MenuItem.create(menu_id: @menu.id, name: "Ссылка #{i}", link: "/")
  end
end

#create menus in footer
4.times do |i|
  @menu = Menu.create(name: "Меню  в футоре #{i}", descriptor: "footer_menu#{i}")
  5.times do |k|
    MenuItem.create(menu_id: @menu.id, name: "Ссылка #{i}", link: "/")
  end 
end  