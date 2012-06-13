class CreateQuizMisconceptions < ActiveRecord::Migration
  tag :predeploy
  
  def self.up
    create_table :quiz_misconceptions do |t|
      t.integer :quiz_id, :limit => 8
      t.string :name
      t.string :description, :limit => 512
      t.string :explanation_url, :limit => 2048
      t.string :pattern_json, :limit => 2048
      t.integer :position

      t.timestamps
    end

    add_index :quiz_misconceptions, :quiz_id
  end

  def self.down
    remove_index :quiz_misconceptions, :quiz_id
    drop_table :quiz_misconceptions
  end
end
