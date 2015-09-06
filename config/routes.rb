Rails.application.routes.draw do

  resources :product_tags

  resources :tags

  resources :mini_carts

  resources :site_variables

  resources :static_pages

  resources :slides

  resources :sliders

  resources :orders

  resources :line_items

  resources :carts

  resources :product_category_attacments

  resources :sellers

  

  resources :post_categories
  resources :posts 

  resources :product_categories
  resources :products

  
  resources :product_attacments


  root 'static#home'


  namespace :administrator do
    resources :products
    resources :product_categories
    resources :orders
    resources :posts
    resources :post_categories
    resources :sliders
    resources :slides
    resources :sellers
    resources :static_pages
    resources :site_variables
  end

  namespace :seller do
    resources :products
    resources :orders
  end

  get '/administrator', to: 'administrator#dashboard'

  get '/seller', to: 'seller#dashboard'
  get '/seller/seller_edit', to: 'seller#seller_edit'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
