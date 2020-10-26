Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]                                          
  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'    
    put 'users' => 'devise/registrations#update', :as => 'user_registration'            
  end
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      put 'posts/update/:id', to: 'posts#update'
      get '/show/:slug', to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
    end
  end
  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
