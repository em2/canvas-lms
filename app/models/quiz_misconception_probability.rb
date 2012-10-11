class QuizMisconceptionProbability < ActiveRecord::Base
	belongs_to :quiz, :touch => true

	def high_probability=(hash)
		write_attribute(:high_probability, hash.to_json)
	end

	def high_probability
		JSON.parse(read_attribute(:high_probability)) rescue nil
	end

	def somewhat_probability=(hash)
		write_attribute(:somewhat_probability, hash.to_json)
	end

	def somewhat_probability
		JSON.parse(read_attribute(:somewhat_probability)) rescue nil
	end

end
