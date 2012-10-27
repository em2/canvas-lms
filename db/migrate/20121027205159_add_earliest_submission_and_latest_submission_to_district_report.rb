class AddEarliestSubmissionAndLatestSubmissionToDistrictReport < ActiveRecord::Migration
	tag :predeploy

  def self.up
  	add_column :district_reports, :earliest_submission, :datetime
  	add_column :district_reports, :latest_submission, :datetime
  end

  def self.down
  	remove_column :district_reports, :latest_submission
  	remove_column :district_reports, :earliest_submission
  end
end
