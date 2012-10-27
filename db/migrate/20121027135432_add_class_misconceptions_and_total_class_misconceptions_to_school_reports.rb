class AddClassMisconceptionsAndTotalClassMisconceptionsToSchoolReports < ActiveRecord::Migration
	tag :predeploy

  def self.up
  	add_column :school_reports, :class_misconceptions, :string, :limit => 2048
  	add_column :school_reports, :total_class_misconceptions, :string, :limit => 2048
  end

  def self.down
  	remove_column :school_reports, :total_class_misconceptions
  	remove_column :school_reports, :class_misconceptions
  end
end
