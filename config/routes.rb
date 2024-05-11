Rails.application.routes.draw do
  get 'posts/index'
  get 'posts/show'
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  get 'passwords/edit'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root to: 'feeds#index'

  resources :confirmations, only: [:create, :edit], param: :confirmation_token
  resources :passwords, only: [:edit], param: :password_reset_token

  # Profile
  get '/profile', to: "profiles#edit"
  post '/profile', to: "profiles#update"
  post '/profile/avatar', to: "profiles#update_avatar"

  # Posts
  resources :posts, only: [:create]

  # Users
  get '/register', to: "users#new"
  post '/register', to: "users#create"

  # Sessions
  get '/login', to: "sessions#new"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
