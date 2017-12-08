Rails.application.routes.draw do
  devise_for :admins, controllers: {
    sessions: 'admins/sessions',
    passwords: 'admins/passwords',
    registrations: 'admins/registrations'
  }
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations'
  }
  root to: "posts#index"
  resources :posts
  resources :users, only: [:index, :show, :edit, :update] do
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
