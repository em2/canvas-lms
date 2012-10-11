class CreateQuizMisconceptionProbabilities < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :quiz_misconception_probabilities do |t|
      t.integer :quiz_id, :limit => 8
      t.string :high_probability
      t.string :somewhat_probability

      t.timestamps
    end

    add_index :quiz_misconception_probabilities, :quiz_id
  end

  def self.down
    remove_index :quiz_misconception_probabilities, :quiz_id
    drop_table :quiz_misconception_probabilities
  end
end