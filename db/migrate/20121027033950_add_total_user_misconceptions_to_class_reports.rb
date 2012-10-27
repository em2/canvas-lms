class AddTotalUserMisconceptionsToClassReports < ActiveRecord::Migration
	tag :predeploy

  def self.up
  	add_column :class_reports, :total_user_misconceptions, :string, :limit => 2048
  end

  def self.down
  	remove_column :class_reports, :total_user_misconceptions
  end
end
