Rails.application.routes.draw do
  get 'passwords/edit'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root to: 'application#index'

  resources :users

  resources :confirmations, only: [:create, :edit], param: :confirmation_token
  resources :passwords, only: [:edit], param: :password_reset_token

  get '/login', to: "sessions#new"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
