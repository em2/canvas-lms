class AddClassroomIdToCourses < ActiveRecord::Migration
  def self.up
    add_column :courses, :classroom_id, :integer, :limit => 8
  end

  def self.down
    remove_column :courses, :classroom_id
  end
end
