Rails.application.routes.draw do


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  get '/auth/:provider/callback', to: 'sessions#create'

  root "application#index"

  get "/tweets" => "tweets#index"
  get "/bing_results" => "bing_results#index"

end
