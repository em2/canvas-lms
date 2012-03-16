class AddCourseIdToClassrooms < ActiveRecord::Migration
  def self.up
    add_column :classrooms, :course_id, :integer, :limit => 8
  end

  def self.down
    remove_column :classrooms, :course_id
  end
end
