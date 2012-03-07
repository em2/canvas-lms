class CreateIdGatekeepers < ActiveRecord::Migration
  def self.up
    create_table :id_gatekeepers do |t|
      t.string :assessment_name
      t.string :stage
      t.integer :instance
      t.integer :quiz_id, :limit => 8
      t.integer :course_id, :limit => 8
      t.integer :assessment_question_bank_id, :limit => 8
      

      t.timestamps
    end
  end

  def self.down
    drop_table :id_gatekeepers
  end
end
