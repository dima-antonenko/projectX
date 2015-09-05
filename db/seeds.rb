category_counter = 0
children_category_counter = 0
i = 0

Product.destroy_all
ProductCategory.destroy_all
Post.destroy_all
Menu.destroy_all
MenuItem.destroy_all

#one category on main page and children
@product_category = ProductCategory.create(name: "Категория 1", to_main_page: true)

while children_category_counter < 10
  ProductCategory.create(name: "Категория: 1-#{children_category_counter}",
                         to_main_page_product_categories_list_order: children_category_counter, product_category_id: @product_category.id )
  children_category_counter += 1
end
children_category_counter = 0


# products to main page in product grid
while i < 35
  Product.create!([
                    {product_category_id: @product_category.id, seller_id: 1, name: "Тестовый товар #{i}", price: 5000, old_price: 8000, sku: "1234",
                     avability: "in_stock",  status: "published", to_main_page: true, count_sales: i, count_views: i * 2, show_in_category_block_to_main_page: true },
  ])
  i += 1
end

#categories list on main page
category_counter = 0
while category_counter < 9
  @product_category = ProductCategory.create(name: "Категория #{category_counter}", to_main_page_product_categories_list: true,
                                             to_main_page_product_categories_list_order: category_counter )

  while children_category_counter < 5
    ProductCategory.create(name: "Категория: #{category_counter}-#{children_category_counter}", to_main_page_product_categories_list: true,
                           to_main_page_product_categories_list_order: children_category_counter, product_category_id: @product_category.id )
    children_category_counter += 1
  end

  children_category_counter = 0
  category_counter += 1
end

#create news to main page
i = 0

while i < 5
  Post.create(name: "Новость #{i}", post_category_id: 1, to_main_page: true, content: "this is content", lead: "this is lead")
  i += 1
end

i = 0
@menu = Menu.create(name: "Главное меню", descriptor: "main_menu")

while i < 5
  if i == 2
    @menu_item = MenuItem.create(menu_id: @menu.id, name: "Ссылка #{i}", link: "/")
    4.times do |k|
      MenuItem.create(menu_id: @menu.id, name: "Подссылка #{k}", link: "/", menu_item_id: @menu_item.id)
    end
  else
    MenuItem.create(menu_id: @menu.id, name: "Ссылка #{i}", link: "/")
  end
end
