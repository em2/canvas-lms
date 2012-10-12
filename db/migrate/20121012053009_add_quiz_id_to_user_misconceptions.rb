class AddQuizIdToUserMisconceptions < ActiveRecord::Migration
	tag :predeploy
	
  def self.up
  	add_column :user_misconceptions, :quiz_id, :integer, :limit => 8
  end

  def self.down
  	remove_column :user_misconceptions, :quiz_id
  end
end
