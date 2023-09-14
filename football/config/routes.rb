Rails.application.routes.draw do
  resources :seasons, only: %i[index] do
    resources :games, only: %i[index]
  end
  resources :games, only: %i[show]
end
