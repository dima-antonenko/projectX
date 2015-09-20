json.array!(@adverts) do |advert|
  json.extract! advert, :id
  json.url advert_url(advert, format: :json)
end
