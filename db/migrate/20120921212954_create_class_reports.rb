class CreateClassReports < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :class_reports do |t|
      t.integer :course_id, :limit => 8
      t.integer :quiz_id, :limit => 8
      t.string :q
      t.string :number_correct
      t.string :number_attempted
      t.string :percent_correct
      t.string :item_analysis
      t.integer :teacher_id, :limit => 8
      t.string :teacher_name
      t.string :course_name
      t.string :school_name
      t.integer :submitted_student_count
      t.string :submissions

      t.timestamps
    end
  end

  def self.down
    drop_table :class_reports
  end
end
