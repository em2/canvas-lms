class CreateUserMisconceptions < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :user_misconceptions do |t|
      t.integer :user_id, :limit => 8
      t.integer :quiz_misconception_id, :limit => 8
      t.integer :confidence_level

      t.timestamps
    end

    add_index :user_misconceptions, :quiz_misconception_id
  end

  def self.down
    remove_index :user_misconceptions, :quiz_misconception_id
    drop_table :user_misconceptions
  end
end
