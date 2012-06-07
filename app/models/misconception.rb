class Misconception < ActiveRecord::Base
	belongs_to :quiz

	#attr_accessor :pattern_json

	def pattern=(hash)
		self.pattern_json = hash.to_json
		@pattern_hash = hash.clone
	end

	def pattern
		@pattern_hash ||= JSON.parse(self.pattern_json)
	end
end
