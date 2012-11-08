module ApplicationHelper

	def clear
		content_tag :div, "", :class => "clear"
	end

	def pledge_count
		Pledge.sum(:amount) ? ((Pledge.sum(:amount) + APP['additional_pledge'])/20).to_i : 0
	end

	def pledge_amount
		number_with_precision(Pledge.sum(:amount) + APP['additional_pledge'], :precision => 0, :delimiter => ',')
	end

	def countdown
		(Date.new(2012,12,07) - Date.today).to_i 
	end

end
