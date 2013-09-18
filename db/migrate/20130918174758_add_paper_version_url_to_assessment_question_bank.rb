class AddPaperVersionUrlToAssessmentQuestionBank < ActiveRecord::Migration
  tag :predeploy

  def self.up
    add_column :assessment_question_banks, :paper_version_url, :string, :limit => 2048
  end

  def self.down
    remove_column :assessment_question_banks, :paper_version_url
  end
end
