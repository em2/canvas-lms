class AddFullNameToAssessmentQuestionBank < ActiveRecord::Migration
	tag :predeploy
	
	def self.up
		add_column :assessment_question_banks, :full_name, :string
	end

	def self.down
		remove_column :assessment_question_banks, :full_name
	end
end
