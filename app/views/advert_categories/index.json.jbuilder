json.array!(@advert_categories) do |advert_category|
  json.extract! advert_category, :id
  json.url advert_category_url(advert_category, format: :json)
end
