class CreateQuizMisconceptions < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :quiz_misconceptions do |t|
      t.integer :quiz_id, :limit => 8
      t.string :name, :limit => 2048
      t.string :description, :limit => 2048
      t.string :explanation_url, :limit => 2048
      t.string :pattern, :limit => 2048
      t.integer :position
      t.string :workflow_state
      t.integer :assessment_misconception_id, :limit => 8
      t.integer :assessment_misconception_version
      t.integer :quiz_group_id, :limit => 8

      t.timestamps
    end

    add_index :quiz_misconceptions, :quiz_id
    add_index :quiz_misconceptions, :assessment_misconception_id
    add_index :quiz_misconceptions, :quiz_group_id
  end

  def self.down
    remove_index :quiz_misconceptions, :quiz_group_id
    remove_index :quiz_misconceptions, :assessment_misconception_id
    remove_index :quiz_misconceptions, :quiz_id
    drop_table :quiz_misconceptions
  end
end
