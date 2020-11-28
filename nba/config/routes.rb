Rails.application.routes.draw do
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
