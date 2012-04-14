class AppMailer < ActionMailer::Base
  default from: "support@kosjourney.com"

  def welcome_email(teacher, charge_obj)
    @teacher = teacher
    @charge = charge_obj
    mail(:to => "#{@teacher.name} <#{@teacher.email}>", :subject => "Welcome to Ko's Journey!")
  end

end
