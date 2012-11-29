class AddUserDifficultiesAndTotalUserDifficultiesToClassReport < ActiveRecord::Migration
	tag :predeploy

  def self.up
    add_column :class_reports, :user_difficulties, :string
    add_column :class_reports, :total_user_difficulties, :string
  end

  def self.down
    remove_column :class_reports, :total_user_difficulties
    remove_column :class_reports, :user_difficulties
  end
end
