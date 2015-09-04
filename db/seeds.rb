i = 0
while i < 35
  Product.create!([
  {product_category_id: 1, seller_id: 1, name: "Тестовый товар #{i}", price: "5000.0", old_price: "8000.0", sku: "1234",
   avability: "in_stock",  status: "published", to_main_page: true},
  ])
  i += 1
end