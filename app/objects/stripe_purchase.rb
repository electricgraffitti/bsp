class StripePurchase

	require "stripe"

	def self.create_charge(params, customer_stripe_id, description)
		Stripe.api_key = APP["stripe_key"]
		Stripe::Charge.create(
  		:amount => Currency.calculate_dollars_to_cents(params[:pledge][:amount]),
  		:customer => customer_stripe_id,
  		:currency => "usd",
  		:description => description
		)
	end

	def self.get_charge(charge_id)
		Stripe.api_key = APP["stripe_key"]
		charge = Stripe::Charge.retrieve(charge_id)
		return charge
	end

	def self.get_all_charges(customer_id = nil)
		Stripe.api_key = APP["stripe_key"]
		if customer_id
			charges = Stripe::Charge.all(:customer => customer_id)
		else
			charges = Stripe::Charge.all
		end
		return charges
	end

	def self.refund_charge(charge_id, amount = nil)
		Stripe.api_key = APP["stripe_key"]
		charge = StripePurchase.get_charge(charge_id)
			if amount 
				charge.amount == amount # Must be a positive integer in cents 
			end
		charge.refund
	end

	private

	def retrieve_stripe_key
    return Stripe.api_key = APP["stripe_key"]
  end

end