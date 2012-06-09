class PagesController < ApplicationController
	
  def home
  end

  def about
  end

  def contact
  end

  def new_contact
  	AppMailer.contact_email(params).deliver
  	redirect_to home_path, :notice => "You submission has been sent."
  end
end
