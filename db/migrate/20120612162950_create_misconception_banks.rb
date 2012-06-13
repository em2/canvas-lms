class CreateMisconceptionBanks < ActiveRecord::Migration
	tag :predeploy

  def self.up
    create_table :misconception_banks do |t|
      t.integer :assessment_question_bank_id, :limit => 8

      t.timestamps
    end

    add_index :misconception_banks, :assessment_question_bank_id
  end

  def self.down
  	remove_index :misconception_banks, :assessment_question_bank_id
    drop_table :misconception_banks
  end
end
