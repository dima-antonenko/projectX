json.array!(@product_attacments) do |product_attacment|
  json.extract! product_attacment, :id
  json.url product_attacment_url(product_attacment, format: :json)
end
