class AddAssessmentIdUniquenessIndex < ActiveRecord::Migration
  def self.up
    add_index :id_gatekeepers, :assessment_id, :unique => true
  end

  def self.down
    remove_index :users, :assessment_id
  end
end
