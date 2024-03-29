Rails.application.routes.draw do
  resources :games, only: %i[index]
  resources :seasons, only: %i[index show] do
    resources :teams, only: %i[index]
    resources :games, only: %i[index]
  end
  resources :teams, only: %i[show] do
    resources :players, only: %i[index]
  end
  resources :players, only: %i[show]
  resources :games, only: %i[show] do
    resources :batting_stats, only: %i[index]
    resources :pitching_stats, only: %i[index]
    resources :forecasts, only: %i[index]
  end
  resources :pitching_stats, only: %i[show]
  resources :batting_stats, only: %i[show]
  get 'games/:id/away_team', to: 'games#away_team'
  get 'games/:id/home_team', to: 'games#home_team'
  get 'games/:id/away_players', to: 'games#away_players'
  get 'games/:id/home_players', to: 'games#home_players'
end
