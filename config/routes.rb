Rails.application.routes.draw do

  devise_for :sellers
  root 'site/static#home'
  get 'sellers/dashboard', as: 'seller_root'


  scope module: 'site' do
    resources :adverts
    resources :advert_categories

    resources :product_tags
    resources :tags
    resources :site_variables
    resources :static_pages
    resources :slides
    resources :sliders
    resources :orders

    resources :line_items do
      get 'increment_count', on: :member
      get 'decrement_count', on: :member 
    end 

    resources :carts
    resources :product_category_attacments
    #resources :sellers
    resources :post_categories
    resources :posts
    resources :product_attacments
    resources :product_categories

    resources :products do
      resources :product_questions
      resources :mini_carts
    end
  end

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

  




  namespace :sellers do
    resources :products
    resources :orders

    resources :adverts do
      post 'set_active', on: :member
      post 'set_archive', on: :member
      resources :advert_positions
    end
  end



  get '/administrator', to: 'administrator#dashboard'

 

  match "/search" => "site/products#search", via: [ :get, :post ]


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
