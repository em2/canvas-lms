class AddIdGatekeeperIdToQuizzes < ActiveRecord::Migration
  def self.up
    add_column :quizzes, :id_gatekeeper_id, :integer, :limit => 8
  end

  def self.down
    remove_column :quizzes, :id_gatekeeper_id
  end
end
