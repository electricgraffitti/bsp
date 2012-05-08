Bsp::Application.routes.draw do

  match "welcome" => "pages#home", :as => :home
  match "about" => "pages#about", :as => :about
  match "contact" => "pages#contact", :as => :contact

  root :to => "pages#home"

end
