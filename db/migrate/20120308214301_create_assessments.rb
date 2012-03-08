class CreateAssessments < ActiveRecord::Migration
  def self.up
    create_table :assessments do |t|
      t.string :assessment_name
      t.string :course_name_short
      t.string :stage
      t.string :instance
      t.integer :quiz_id, :limit => 8
      t.integer :course_id, :limit => 8
      t.integer :assessment_question_bank_id, :limit => 8

      t.timestamps
    end
  end

  def self.down
    drop_table :assessments
  end
end
