module ApplicationHelper

	def clear
		content_tag :div, "", :class => "clear"
	end

	def pledge_count
		Pledge.count ? Pledge.count : 0
	end

	def pledge_amount
		number_with_precision Pledge.sum(:amount), :precision => 2
	end

end
