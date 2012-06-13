class MisconceptionBank < ActiveRecord::Base
	has_many :misconceptions, :order => 'position, name, created_at'
end
