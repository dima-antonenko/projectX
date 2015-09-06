json.array!(@product_tags) do |product_tag|
  json.extract! product_tag, :id
  json.url product_tag_url(product_tag, format: :json)
end
