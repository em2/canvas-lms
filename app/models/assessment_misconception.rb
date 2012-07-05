class AssessmentMisconception < ActiveRecord::Base
	belongs_to :assessment_question_bank, :touch => true
	has_many :quiz_misconceptions

	named_scope :active, lambda {
		{:conditions => ['assessment_misconceptions.workflow_state != ?', 'deleted'] }
	}
		
	def pattern=(hash)
		write_attribute(:pattern, hash.to_json)
	end

	def pattern
		JSON.parse(read_attribute(:pattern))
	end
end
