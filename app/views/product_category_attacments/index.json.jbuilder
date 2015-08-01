json.array!(@product_category_attacments) do |product_category_attacment|
  json.extract! product_category_attacment, :id
  json.url product_category_attacment_url(product_category_attacment, format: :json)
end
