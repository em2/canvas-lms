class CreateDrawingUrls < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :drawing_urls do |t|
      t.integer :quiz_submission_id, :limit => 8
      t.integer :quiz_id, :limit => 8
      t.integer :user_id, :limit => 8
      t.integer :question_id, :limit => 8
      t.string :url

      t.timestamps
    end
    add_index :drawing_urls, :quiz_submission_id
    add_index :drawing_urls, :quiz_id
    add_index :drawing_urls, :user_id
    add_index :drawing_urls, :question_id
  end

  def self.down
    drop_table :drawing_urls
  end
end
