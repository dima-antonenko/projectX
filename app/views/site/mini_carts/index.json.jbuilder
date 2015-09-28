json.array!(@mini_carts) do |mini_cart|
  json.extract! mini_cart, :id
  json.url mini_cart_url(mini_cart, format: :json)
end
