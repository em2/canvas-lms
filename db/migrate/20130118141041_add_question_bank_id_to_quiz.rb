class AddQuestionBankIdToQuiz < ActiveRecord::Migration
  tag :predeploy

  def self.up
    add_column :quizzes, :question_bank_id, :integer, :limit => 8
    add_index :quizzes, :question_bank_id
  end

  def self.down
    remove_index :quizzes, :question_bank_id
    remove_column :quizzes, :question_bank_id
  end
end
