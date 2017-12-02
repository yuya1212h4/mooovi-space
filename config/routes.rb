Rails.application.routes.draw do
  devise_for :users
  root to: "posts#index"
  resources :posts
  resources :users, only: [:index, :show] do
    collection do
      get 'search'
      get 'ajax'
    end
    member do
      get :following, :followers
    end
  end
  resources :relationships, only: [:create, :destroy]
end
