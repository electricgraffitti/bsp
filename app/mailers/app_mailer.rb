class AppMailer < ActionMailer::Base
  default from: "support@kosjourney.com"

  def thank_you_email(pledge, charge_obj)
    if charge_obj == 0
      @charge = charge_obj
    else
      @charge = charge_obj.amount
    end
    @pledge = pledge
    mail(:to => "#{@pledge.first_name} #{@pledge.last_name} <#{@pledge.email}>", :subject => "Thank you for your pledge to The Biggest Story Problem.")
  end

  def imagine_new_pledge_notification(pledge, customer_obj, charge_obj)
    if charge_obj == 0
      @charge = charge_obj
    else
      @charge = charge_obj.amount
    end
    @pledge = pledge
    @customer = customer_obj
    mail(:to => "Scott Laidlaw <scott@imagineeducation.org>, Jennifer Harris <jennifer@imagineeducation.org>", :subject => "New BSP Pledge!")
  end  

  def contact_email(params)
    @first_name = params[:first_name]
    @last_name = params[:last_name]
    @email = params[:email]
    @hear_about = params[:hear_about]
    @comments = params[:comments]
    mail(:to => "Jennifer Lightwood <jennifer@imagineeducation.org>, Kate Martin <kate@imagineeducation.org>,  Scott Laidlaw <scott@imagineeducation.org>", :subject => "Biggest Story Problem Submission")
  end

end
