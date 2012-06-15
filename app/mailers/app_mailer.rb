class AppMailer < ActionMailer::Base
  default from: "support@kosjourney.com"

  def contact_email(params)
    @first_name = params[:first_name]
    @last_name = params[:last_name]
    @email = params[:email]
    @comments = params[:comments]
    mail(:to => "Jennifer Lightwood Harris Laidlaw Ortega Hanson Finn the Third <jennifer@imagineeducation.org>, Kate Martin <kate@imagineeducation.org>", :subject => "Biggest Story Problem Submission")
  end

end
