require 'sidekiq/web'
Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_nba_sidekiq_session'
Rails.application.routes.draw do
  mount Sidekiq::Web => '/nba/sidekiq'
  resources :seasons, only: %i[index show] do
    resources :teams, only: %i[index]
    resources :games, only: %i[index]
  end
  resources :teams, only: %i[show] do
    resources :players, only: %i[index]
  end
  resources :players, only: %i[show]
  resources :games, only: %i[show] do
    resources :stats, only: %i[index]
  end
  resources :stats, only: %i[show]
end
