class Roster < ActiveRecord::Base
	belongs_to :account
	named_scope :by_name, :order => 'name ASC'
end
