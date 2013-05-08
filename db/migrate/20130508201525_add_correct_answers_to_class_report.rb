class AddCorrectAnswersToClassReport < ActiveRecord::Migration
  tag :predeploy

  def self.up
    add_column :class_reports, :correct_answers, :string, :limit => 2048
  end

  def self.down
    remove_column :class_reports, :correct_answers
  end
end
