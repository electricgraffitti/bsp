require 'spec_helper'

describe "pledges/index" do
  before(:each) do
    assign(:pledges, [
      stub_model(Pledge,
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
      ),
      stub_model(Pledge,
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
      )
    ])
  end

  it "renders a list of pledges" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "First Name".to_s, :count => 2
    assert_select "tr>td", :text => "Last Name".to_s, :count => 2
    assert_select "tr>td", :text => "Stripe".to_s, :count => 2
    assert_select "tr>td", :text => "9.99".to_s, :count => 2
    assert_select "tr>td", :text => "School".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Billing Address".to_s, :count => 2
    assert_select "tr>td", :text => "Billing City".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Billing Zip".to_s, :count => 2
  end
end
