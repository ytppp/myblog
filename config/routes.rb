Rails.application.routes.draw do
  root "pages#index"

  get "/signup", to: "users#new"
  get "admin", to: 'pages#admin'

  resources :users
  resources :articles
end
