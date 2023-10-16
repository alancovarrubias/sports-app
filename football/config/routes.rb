require 'sidekiq/web'
Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_interslice_session'
Rails.application.routes.draw do
  resources :games, only: %i[index show]
  mount Sidekiq::Web => '/sidekiq'
end
