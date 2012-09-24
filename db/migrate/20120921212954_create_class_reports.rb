class CreateClassReports < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :class_reports do |t|
      t.integer :course_id, :limit => 8
      t.integer :probe_id, :limit => 8
      t.integer :quiz_id, :limit => 8
      t.string :q, :limit => 2048
      t.string :number_correct, :limit => 2048
      t.string :number_attempted, :limit => 2048
      t.string :percent_correct, :limit => 2048
      t.string :item_analysis, :limit => 2048
      t.integer :teacher_id, :limit => 8
      t.string :teacher_name
      t.string :course_name
      t.string :school_name
      t.integer :submitted_students_count
      t.string :submitted_students_ids, :limit => 2048
      t.integer :quiz_question_count
      t.string :submissions, :limit => 2048

      t.timestamps
    end
  end

  def self.down
    drop_table :class_reports
  end
end
