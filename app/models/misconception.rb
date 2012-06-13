class Misconception < ActiveRecord::Base
	belongs_to :misconception_bank, :touch => true
end
