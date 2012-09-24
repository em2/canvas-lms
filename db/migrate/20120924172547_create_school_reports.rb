class CreateSchoolReports < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :school_reports do |t|
      t.integer :account_id, :limit => 8
      t.integer :probe_id, :limit => 8
      t.integer :quiz_question_count
      t.string :report_name
      t.integer :participating_students_count
      t.integer :participating_class_count
      t.string :course_ids
      t.string :teacher_name
      t.string :submitted_students_count
      t.string :item_analysis, :limit => 2048
      t.string :school_name
      t.string :analysis

      t.timestamps
    end
  end

  def self.down
    drop_table :school_reports
  end
end
