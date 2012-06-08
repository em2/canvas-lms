class Misconception < ActiveRecord::Base
	belongs_to :quiz

	attr_accessor :position

	def pattern=(hash)
		self.pattern_json = hash.to_json
		@pattern_hash = hash.clone
	end

	def pattern
		@pattern_hash ||= JSON.parse(self.pattern_json)
	end

	def explanation=(url)
		self.explanation_url = url
		@explanation = url
	end

	def explanation
		@explanation ||= self.explanation_url
	end


end
