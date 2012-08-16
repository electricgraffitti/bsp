# == Schema Information
#
# Table name: states
#
#  id           :integer(4)      not null, primary key
#  full_name    :string(255)
#  abbreviation :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#


class State < ActiveRecord::Base

  # Includes

  # Callbacks

  # Associations
  has_many :pledges

  # Validations
  
  # Methods
  def for_select
    all(:order => "abbreviation").collect { |s| s.abbreviation }
  end
end