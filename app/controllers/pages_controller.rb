class PagesController < ApplicationController
	
  def home
    @page_class = "play_trailer"
  end

  def about
  end

  def contact
  end

  def new_contact
  	AppMailer.contact_email(params).deliver
  	redirect_to home_path, :notice => "Your submission has been sent."
  end
end
