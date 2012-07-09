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

	def explanation_url=(url)
		if (url.empty? || (url[0] == 104 && (url['http://'] || url['https://'])))
			write_attribute(:explanation_url, url)
		else
			url.insert(0,'http://')
			write_attribute(:explanation_url, url)
		end
	end

	def explanation_url
		read_attribute(:explanation_url)
	end
end