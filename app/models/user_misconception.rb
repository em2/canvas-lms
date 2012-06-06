class UserMisconception < ActiveRecord::Base
	belongs_to :user
	belongs_to :misconception
end
