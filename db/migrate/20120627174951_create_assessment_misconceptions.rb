class CreateAssessmentMisconceptions < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :assessment_misconceptions do |t|
      t.integer :assessment_question_bank_id, :limit => 8
      t.string :name, :limit => 2048
      t.string :description, :limit => 2048
      t.string :explanation_url, :limit => 2048
      t.string :pattern, :limit => 2048
      t.integer :position
      t.integer :context_id, :limit => 8
      t.string :context_type
      t.string :workflow_state

      t.timestamps
    end

    add_index :assessment_misconceptions, :assessment_question_bank_id
  end

  def self.down
    remove_index :assessment_misconceptions, :assessment_question_bank_id
    drop_table :assessment_misconceptions
  end
end
