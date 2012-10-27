class AddEarliestSubmissionAndLatestSubmissionToSchoolReport < ActiveRecord::Migration
	tag :predeploy

  def self.up
  	add_column :school_reports, :earliest_submission, :datetime
  	add_column :school_reports, :latest_submission, :datetime
  end

  def self.down
  	remove_column :school_reports, :latest_submission
  	remove_column :school_reports, :earliest_submission
  end
end
