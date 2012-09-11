module ApplicationHelper

	def clear
		content_tag :div, "", :class => "clear"
	end

	def pledge_count
		Pledge.sum(:amount) ? (Pledge.sum(:amount)/20).to_i : 0
	end

	def pledge_amount
		number_with_precision Pledge.sum(:amount), :precision => 2
	end

	def countdown
		(Date.new(2012,10,15) - Date.today).to_i 
	end

end
