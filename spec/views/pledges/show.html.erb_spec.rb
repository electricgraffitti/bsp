require 'spec_helper'

describe "pledges/show" do
  before(:each) do
    @pledge = assign(:pledge, stub_model(Pledge,
      :first_name => "First Name",
      :last_name => "Last Name",
      :stripe_id => "Stripe",
      :amount => "9.99",
      :school => "School",
      :instructions => "MyText",
      :billing_address => "Billing Address",
      :billing_city => "Billing City",
      :state_id => 1,
      :billing_zip => "Billing Zip"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/First Name/)
    rendered.should match(/Last Name/)
    rendered.should match(/Stripe/)
    rendered.should match(/9.99/)
    rendered.should match(/School/)
    rendered.should match(/MyText/)
    rendered.should match(/Billing Address/)
    rendered.should match(/Billing City/)
    rendered.should match(/1/)
    rendered.should match(/Billing Zip/)
  end
end
