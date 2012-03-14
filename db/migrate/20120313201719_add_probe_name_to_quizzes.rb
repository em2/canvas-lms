class AddProbeNameToQuizzes < ActiveRecord::Migration
  def self.up
    add_column :quizzes, :probe_name, :string
  end

  def self.down
    remove_column :quizzes, :probe_name
  end
end
