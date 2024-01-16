Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "pages/index"
  root "pages#index"

  resources :articles

  get "admin", to: 'pages#admin'

end
