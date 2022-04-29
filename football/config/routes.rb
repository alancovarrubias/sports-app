Rails.application.routes.draw do
  resources :games
  resources :lines
  resources :teams
  resources :seasons
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
