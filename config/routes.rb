Rails.application.routes.draw do
  root "pages#index"

  get "signup", to: "users#new"
  get "admin", to: "pages#admin"
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  resources :users
  resources :articles
end
