class UserMisconception < ActiveRecord::Base
	belongs_to :user
	belongs_to :quiz_misconception
	belongs_to :quiz

	named_scope :active, lambda {
		{:conditions => ['user_misconceptions.workflow_state != ?', 'deleted'] }
	}
end
