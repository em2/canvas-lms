class AddPaperVersionUrlToQuiz < ActiveRecord::Migration
  tag :predeploy

  def self.up
    add_column :quizzes, :paper_version_url, :string, :limit => 2048
  end

  def self.down
    remove_column :quizzes, :paper_version_url
  end
end
