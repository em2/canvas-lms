class UserMisconception < ActiveRecord::Base
	belongs_to :user
	belongs_to :quiz_misconception
end
