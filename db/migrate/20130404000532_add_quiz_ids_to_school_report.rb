class AddQuizIdsToSchoolReport < ActiveRecord::Migration
  tag :predeploy

  def self.up
    add_column :school_reports, :quiz_ids, :string
  end

  def self.down
    remove_column :school_reports, :quiz_ids
  end
end
