class AddSchoolDifficultiesAndTotalSchoolDifficultiesToDistrictReport < ActiveRecord::Migration
	tag :predeploy

  def self.up
    add_column :district_reports, :school_difficulties, :string
    add_column :district_reports, :total_school_difficulties, :integer
  end

  def self.down
    remove_column :district_reports, :total_school_difficulties
    remove_column :district_reports, :school_difficulties
  end
end
