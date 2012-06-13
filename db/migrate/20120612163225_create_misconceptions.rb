class CreateMisconceptions < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :misconceptions do |t|
      t.integer :misconception_bank_id, :limit => 8
      t.string :name
      t.string :description, :limit => 512
      t.string :explanation_url, :limit => 2048
      t.string :pattern_json, :limit => 2048
      t.integer :position

      t.timestamps
    end

    add_index :misconceptions, :misconception_bank_id
  end

  def self.down
    remove_index :misconceptions, :misconception_bank_id
    drop_table :misconceptions
  end
end
