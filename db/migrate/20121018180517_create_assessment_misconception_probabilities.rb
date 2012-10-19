class CreateAssessmentMisconceptionProbabilities < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :assessment_misconception_probabilities do |t|
      t.integer :assessment_question_bank_id, :limit => 8
      t.string :high_probability
      t.string :somewhat_probability

      t.timestamps
    end

    add_index :assessment_misconception_probabilities, :assessment_question_bank_id, :name => 'index_assessment_miscon_prob_on_assessment_question_bank_id'
  end

  def self.down
    remove_index :assessment_misconception_probabilities, :assessment_question_bank_id
    drop_table :assessment_misconception_probabilities
  end
end
