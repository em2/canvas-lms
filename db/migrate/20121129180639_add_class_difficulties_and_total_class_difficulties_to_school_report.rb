class AddClassDifficultiesAndTotalClassDifficultiesToSchoolReport < ActiveRecord::Migration
	tag :predeploy

  def self.up
    add_column :school_reports, :class_difficulties, :string
    add_column :school_reports, :total_class_difficulties, :integer
  end

  def self.down
    remove_column :school_reports, :total_class_difficulties
    remove_column :school_reports, :class_difficulties
  end
end
