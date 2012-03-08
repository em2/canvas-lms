class AddAssessmentIdToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :assessment_id, :integer, :limit => 8
  end

  def self.down
    remove_column :users, :assessment_id
  end
end
