Product.destroy_all
ProductCategory.destroy_all
Post.destroy_all
Menu.destroy_all
MenuItem.destroy_all
Tag.destroy_all
ProductTag.destroy_all
Banner.destroy_all
ProductCategoryAttacment.destroy_all
ProductAttacment.destroy_all
StaticPage.destroy_all
Seller.destroy_all
SellerReview.destroy_all
ProductQuestion.destroy_all

@text_lorem = "Довольно часто, планируя купить тюльпаны оптом, мы сталкиваемся с недобросовестной деятельностью многих магазинов, приобретая некачественный и неоригинальный товар. Увы, предугадать, что вырастет из луковиц, невозможно. Именно поэтому осуществлять заказ тюльпанов лучше в специализированных магазинах, таких, как Флориум. У нас вы можете выбрать интересующий вас сорт из богатого ассортимента, приобрести красивые цветы и выращивать на радость себе и окружающим.

В магазине Флориум тюльпаны купить можно самые разнообразные: белой, желтой, розовой, насыщенно-красной, пестрой или темной окраски, овальной, лилиевидной, чашевидной или пионовидной формы, с ровными или бахромчатыми краями. На нашем сайте размещена информация и фотографии, которые помогут вам грамотно выбрать посадочный материал, а также познакомят с методиками выращивания тюльпанов. Кроме того, мы предоставляем нашим клиентам значительные скидки, если они приобретают тюльпаны оптом.

Сделайте свой загородный участок островком красоты, гармонии и хорошего настроения — спешите недорого купить тюльпаны в интернет магазине «Флориум». У нас представлен широкий ассортимент этих цветов, который позволит удовлетворить любого, даже самого взыскательного цветовода.

Тюльпаны - это декоративные растения из семейства лилиевидных, происходящих из степных и полупустынных районов Азии. С точки зрения выращивания цветов с целью продажи тюльпаны уступают только розам и хризантемам. На сегодня известно около 100 тысяч сортов тюльпанов, поделены на 15 групп. Важнейшие из них сорта: Менделя, Рембрандта, гибриды Дарвина, тюльпаны лилевидные и папугайные. На сегодня только 800 видов выращиваются для большой продажи. Росток высотой от 12 до 40 см достигает обычно одним цветком, но также известные сорта с многоцветковыми побегами. У диких тюльпанов цветы одинарные красного, белого или желтого цвета. В случае культурных сортов является возможность получения более богатой палитры цветов.

Период вегетации тюльпанов длится с марта до конца июня. Размножение проходит посредством отделения дочерних луковиц от материнских, что происходит раз в год. Чтобы луковицы тюльпанов успели пустить корни до замерзания почвы, они высаживаются в период между сентябрем и ноябрем. В теплицах эти цветы можно выращивать круглый год. Тюльпаны эффективно развиваются в рыхлой почве с pH, приближенному к нейтральному. Независимо от места разведения, обязателен доступ света, ибо только тогда ростки, цветы вступят верного окраску. В отдельных случаях используются затемненные теплицы."


### seller


@seller = Seller.create(name: "Иван", surname: "Иванов", email: "ivanov@mail.ru", skype: "skype_ivanov", zip: 12345, phone: "+7-12-34-567",
 sity: "Москва", sales: 10, score: 100.0, good_reviews: 90)

#create seller reviews
5.times do |i|
  SellerReview.create(seller_id: @seller.id, name: "Николай", email: "nikolay@mail.ru", phone: "+7 123-45-67", skype: "skype_nikola", rating: 4, 
    published: true, content: "Здесь текст отзыва")
end  


### main page


#one category on main page and children
@product_category = ProductCategory.create(name: "Категория 1", to_main_page: true)

10.times do |children_category_counter| 
  ProductCategory.create(name: "Категория: 1-#{children_category_counter}",to_main_page_product_categories_list_order: children_category_counter,
   product_category_id: @product_category.id )
end


# products to main page in product grid
35.times do |i| 
  @product = Product.new(
                    product_category_id: @product_category.id, seller_id: @seller.id, name: "Тестовый товар #{i}", price: 5000, old_price: 8000, sku: "1234",
                     avability: "in_stock",  status: "published", to_main_page: true, count_sales: i, count_views: i * 2,
                      show_in_category_block_to_main_page: true, description: @text_lorem )
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

#create banner
@banner = Banner.new(name: "баннер на главной", descriptor: "main_page_category_banner")
File.open("public/data/demo/banners/main_page_category_banner.jpg") do |f|
  @banner.image = f
end
@banner.save


### data in sidebar on product_category


#create tags
10.times do |t|
  Tag.create(title: "tag #{t}", slug: "tag #{t}")
end  


#create product_tags
@products = Product.all
@tags     = Tag.all.take(2)

@tags.each do |tag|
  @products.each do |product|
    ProductTag.create(product_id: product.id, tag_id: tag.id)
  end  
end


#add products to sidebar
@products.take(3).each do |product|
  product.update_attribute(:to_category_sidebar, true)
  product.update_attribute(:hot_product, true)
end


#add banners
2.times do |t|
  @banner = Banner.new(name: "category_banner_#{t}", to_category_sidebar: true )
 
  File.open("public/data/demo/banners/category_banner_#{t}.png") do |f|
      @banner.image = f
  end
  @banner.save
end 

#add product_categories
@product_categories = ProductCategory.all.take(5)

@product_categories.each do |category|
  category.update_attribute(:to_category_sidebar, true)
end  



### add data to products


#add attacments images
@products = Product.all

@products.each do |product|
 @product.update_attribute(:description, @text_lorem)
 @attachment = ProductAttacment.new(product_id: product.id)

 File.open("public/data/demo/products/avatar#{rand(1..8)}.jpg") do |f|
      @attachment.image = f
 end
 @attachment.save
end

#add questions

@products.each do |product|
  ProductQuestion.create(product_id: product.id, name: "Николай", email: "nikolay@mail.ru", phone: "+7 123-456-78", skype: "skype_nikolay",
    question: "Здесь текст вопроса")
end  


#add data to product categories


#add avatars and description
@product_categories = ProductCategory.all

@product_categories.each do |category|
  File.open("public/data/demo/product_categories/avatar#{rand(1..6)}.jpg") do |f|
    category.avatar = f
  end

  category.description = @text_lorem
  category.save
end

#add attacments

@product_categories.each do |category|
 @attacment = ProductCategoryAttacment.new(product_category_id: category.id)

 File.open("public/data/demo/product_categories/avatar#{rand(1..6)}.jpg") do |f|
    @attacment.image = f
 end

 @attacment.save
end

#add content product_categories#index
StaticPage.create(name: "Категории товаров", content: @text_lorem, descriptor: "product_categories")


#add slugs 
@products = Product.all
@product_categories = ProductCategory.all
@posts = Post.all
@tags = Tag.all

@products.each do |product|
  product.update_attribute(:slug, "product_custom_url_#{product.id}")
end

@product_categories.each do |category|
  category.update_attribute(:slug, "product_category_custom_url_#{category.id}")
end 

@posts.each do |post|
  post.update_attribute(:slug, "post_custom_url_#{post.id}")
end 

@tags.each do |tag|
  tag.update_attribute(:slug, "tag_custom_url_#{tag.id}")
end 