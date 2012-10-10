class AddIndexToReports < ActiveRecord::Migration
	tag :predeploy
  
  def self.up
  	add_index :class_reports, :course_id
    add_index :class_reports, :probe_id
    add_index :class_reports, :quiz_id
    add_index :class_reports, :teacher_id
    add_index :school_reports, :account_id
    add_index :school_reports, :probe_id
    add_index :district_reports, :account_id
    add_index :district_reports, :probe_id
    add_index :reports, :account_id
  end

  def self.down
  	remove_index :class_reports, :course_id
    remove_index :class_reports, :probe_id
    remove_index :class_reports, :quiz_id
    remove_index :class_reports, :teacher_id
    remove_index :school_reports, :account_id
    remove_index :school_reports, :probe_id
    remove_index :district_reports, :account_id
    remove_index :district_reports, :probe_id
    remove_index :reports, :account_id
  end
end
