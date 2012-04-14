class StripePurchase

	require "stripe"

	def self.create_charge(params, customer_stripe_id, description)
		Stripe.api_key = APP["stripe_key"]
		Stripe::Charge.create(
  		:amount => StripePurchase.calculate_purchase_price(params[:teacher_count], params[:student_count]),
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

	def self.calculate_purchase_price(teacher_count, student_count)
		teacher_price = Currency.calculate_dollars_to_cents((teacher_count).to_i * 20)
		student_price = Currency.calculate_dollars_to_cents((student_count).to_i * 12)
		return (teacher_price + student_price)
	end

	def retrieve_stripe_key
    return Stripe.api_key = APP["stripe_key"]
  end

end