class StripeCustomer	

	require "stripe"

	def self.create_customer(params)
		Stripe.api_key = APP["stripe_key"] # Get Key from app_config.yml
    customer = Stripe::Customer.create(
              :card => params[:pledge][:stripe_card_token],
              :email => params[:email],
              :description => params[:email]
    )
    return customer
	end

	def get_all_customers
		Stripe.api_key = APP["stripe_key"]
		customers = Stripe::Customer.all
		return customers
	end

	def self.get_customer(customer_stripe_id)
		Stripe.api_key = APP["stripe_key"]
		customer = Stripe::Customer.retrieve("customer_stripe_id")
		return customer
	end

	def self.update_customer(customer_stripe_id)
		Stripe.api_key = APP["stripe_key"]
		customer = StripeCustomer.get_customer(customer_stripe_id)
		# ... update attributes
		customer.save
	end

	def self.delete_customer(customer_stripe_id)
		Stripe.api_key = APP["stripe_key"]
		customer = StripeCustomer.get_customer(customer_stripe_id)
		customer.delete
	end

	private

	def retrieve_stripe_key
    return Stripe.api_key = APP["stripe_key"]
  end

end