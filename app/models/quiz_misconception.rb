class QuizMisconception < ActiveRecord::Base
	belongs_to :quiz, :touch => true
	belongs_to :assessment_misconception
  belongs_to :quiz_group	

	named_scope :active, lambda {
		{:conditions => ['quiz_misconceptions.workflow_state != ?', 'deleted'] }
	}
		
	def pattern=(hash)
		write_attribute(:pattern, hash.to_json)
	end

	def pattern
		JSON.parse(read_attribute(:pattern))
	end
end
