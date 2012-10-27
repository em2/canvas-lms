class AddSchoolMisconceptionsAndTotalSchoolMisconceptionsToDistrictReports < ActiveRecord::Migration
	tag :predeploy

  def self.up
  	add_column :district_reports, :school_misconceptions, :string, :limit => 2048
  	add_column :district_reports, :total_school_misconceptions, :string, :limit => 2048
  end

  def self.down
  	remove_column :district_reports, :total_school_misconceptions
  	remove_column :district_reports, :school_misconceptions
  end
end
