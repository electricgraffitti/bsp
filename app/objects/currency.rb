class Currency

	def self.calculate_cents_to_dollars(amount)
		return (amount).to_i / 100.0
	end


	def self.calculate_dollars_to_cents(amount)
		return (amount).to_i * 100
	end

end