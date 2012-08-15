Bsp::Application.routes.draw do

  resources :pledges

  match "welcome" => "pages#home", :as => :home
  match "about" => "pages#about", :as => :about
  match "sponsor-dvd" => "pages#sponsor", :as => :sponsor
  match "contact" => "pages#contact", :as => :contact
  match "contact-submission" => "pages#new_contact", :as => :new_contact

  root :to => "pages#home"

end
