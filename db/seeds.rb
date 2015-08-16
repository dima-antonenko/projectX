Seller.create!([
  {name: "Иван", surname: "Иванов", email: "ivanov@test.ru", skype: "skype_ivanov", phone: "+7 123 456 78", zip: "192837", sity: "Москва", avatar: nil, status: "status", info: "info"}
])

Post.create!([
  {post_category_id: 1, name: "Тестовая запись", content: "This is content", lead: nil, to_main_page: false, avatar: "nastol.com.ua_109793.jpg", seo_title: "", seo_description: "", seo_keywords: ""}
])
PostCategory.create!([
  {name: "Категория один", description: "zzz", seo_title: nil, seo_description: nil, seo_keywords: nil},
  {name: "Категория 2", description: "z", seo_title: nil, seo_description: nil, seo_keywords: nil}
])
Product.create!([
  {product_category_id: 1, seller_id: 1, name: "Товар 1", description: " <p>Morbi mollis tellus ac sapien. Nunc nec neque. Praesent nec nisl a purus blandit viverra. Nunc nec neque. Pellentesque auctor neque nec urna.</p>\r\n\r\n                                    <p>Curabitur suscipit suscipit tellus. Cras id dui. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas vestibulum mollis diam.</p>\r\n\r\n                                    <p>Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Sed lectus. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Nam at tortor in tellus interdum sagittis. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est.</p>", short_description: "Vestibulum eu odio. Suspendisse potenti. Morbi mollis tellus ac sapien. Praesent egestas tristique nibh. Nullam dictum felis eu pede mollis pretium. Fusce egestas elit eget lorem. In auctor lobortis lacus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor.", price: "5000.0", old_price: "8000.0", sku: "1234", avability: "in_stock", qty: nil, best_seller_prouduct: false, string: nil, status: "published", seo_title: "", seo_description: "", seo_keywords: "", avatar: "product-850x1036.jpg"},
  {product_category_id: 3, seller_id: nil, name: "Товар 4", description: "", short_description: nil, price: "1000.0", old_price: nil, sku: nil, avability: "in_stock", qty: nil, best_seller_prouduct: false, string: nil, status: nil, seo_title: "", seo_description: "", seo_keywords: "", avatar: "nastol.com.ua_138324.jpg"},
  {product_category_id: 3, seller_id: 1, name: "Товар 4", description: "", short_description: nil, price: "1000.0", old_price: nil, sku: nil, avability: "in_stock", qty: nil, best_seller_prouduct: false, string: nil, status: nil, seo_title: "", seo_description: "", seo_keywords: "", avatar: "nastol.com.ua_138324.jpg"}
])

ProductCategory.create!([
  {name: "Категория 1", description: "11", avatar: "category-slide.jpg", to_main_page: "f", product_category_id: nil, seo_title: "22", seo_description: "33", seo_keywords: "44"},
  {name: "Категория 1-1", description: nil, avatar: nil, to_main_page: "f", product_category_id: 1, seo_title: nil, seo_description: nil, seo_keywords: nil},
  {name: "Категория 1-2", description: nil, avatar: nil, to_main_page: "f", product_category_id: 1, seo_title: nil, seo_description: nil, seo_keywords: nil},
  {name: "Категория 1-3", description: nil, avatar: nil, to_main_page: "f", product_category_id: 1, seo_title: nil, seo_description: nil, seo_keywords: nil},
  {name: "Категория 1-4", description: nil, avatar: nil, to_main_page: "f", product_category_id: 1, seo_title: nil, seo_description: nil, seo_keywords: nil},
  {name: "Категория 1-5", description: "Текст описания", avatar: "nastol.com.ua_138324.jpg", to_main_page: nil, product_category_id: 1, seo_title: "seo_title", seo_description: "seo_description", seo_keywords: "seo_keywords"}
])

SiteVariable.create!([
  {static_page_id: 1, name: "variable1", content: "variable_content", descriptor: "first_variable"},
  {static_page_id: 2, name: "name", content: "value", descriptor: "descriptor"}
])

Slider.create!([
  {name: "Основной слайдер", descriptor: "main_slider"}
])
StaticPage.create!([
  {name: "Главная страница", content: "this is content", descriptor: "main_page"},
  {name: "Контакты", content: "this is content", descriptor: "main_page"}
])
