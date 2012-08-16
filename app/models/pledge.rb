class Pledge < ActiveRecord::Base

	# Associations
	belongs_to :state

	# Attrs
  attr_accessor :stripe_card_token

  # Methods

  def self.setup_pledge_for_stripe(params)
		charge = nil
		customer = nil
		# Wrap in transaction to protect DB on failure of any creations
		begin
			ActiveRecord::Base.transaction do

				# Create new Stripe Customer
				customer = StripeCustomer.create_customer(params)

				# Create new Stripe Charge
				charge = StripePurchase.create_charge(params, customer.id, "BSP Pledge")

				# Create new Pledge record in the Database
				@pledge = Pledge.new(params[:pledge])
				@pledge.stripe_id = customer.id
				@pledge.save!

				# Send Notifications
				AppMailer.thank_you_email(@pledge, charge).deliver
				AppMailer.imagine_new_pledge_notification(@pledge, customer, charge).deliver
			end
			return true
		rescue ActiveRecord::RecordInvalid => invalid
			if charge && charge != 0
				StripePurchase.refund_charge(charge.id, charge.amount)
			end
			if customer
				StripeCustomer.delete_customer(customer.id)
			end
			return false
		end
	end
end
