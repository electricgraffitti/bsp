require 'spec_helper'

describe "pledges/edit" do
  before(:each) do
    @pledge = assign(:pledge, stub_model(Pledge,
      :first_name => "MyString",
      :last_name => "MyString",
      :stripe_id => "MyString",
      :amount => "9.99",
      :school => "MyString",
      :instructions => "MyText",
      :billing_address => "MyString",
      :billing_city => "MyString",
      :state_id => 1,
      :billing_zip => "MyString"
    ))
  end

  it "renders the edit pledge form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => pledges_path(@pledge), :method => "post" do
      assert_select "input#pledge_first_name", :name => "pledge[first_name]"
      assert_select "input#pledge_last_name", :name => "pledge[last_name]"
      assert_select "input#pledge_stripe_id", :name => "pledge[stripe_id]"
      assert_select "input#pledge_amount", :name => "pledge[amount]"
      assert_select "input#pledge_school", :name => "pledge[school]"
      assert_select "textarea#pledge_instructions", :name => "pledge[instructions]"
      assert_select "input#pledge_billing_address", :name => "pledge[billing_address]"
      assert_select "input#pledge_billing_city", :name => "pledge[billing_city]"
      assert_select "input#pledge_state_id", :name => "pledge[state_id]"
      assert_select "input#pledge_billing_zip", :name => "pledge[billing_zip]"
    end
  end
end
