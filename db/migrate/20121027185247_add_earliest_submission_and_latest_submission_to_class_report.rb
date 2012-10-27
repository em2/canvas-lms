class AddEarliestSubmissionAndLatestSubmissionToClassReport < ActiveRecord::Migration
	tag :predeploy

  def self.up
  	add_column :class_reports, :earliest_submission, :datetime
  	add_column :class_reports, :latest_submission, :datetime
  end

  def self.down
  	remove_column :class_reports, :latest_submission
  	remove_column :class_reports, :earliest_submission
  end
end
