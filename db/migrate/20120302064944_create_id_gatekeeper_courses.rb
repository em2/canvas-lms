class CreateIdGatekeeperCourses < ActiveRecord::Migration
  def self.up
    create_table :id_gatekeeper_courses do |t|
      t.integer :id_gatekeeper_id, :limit => 8
      t.integer :course_id, :limit => 8

      t.timestamps
    end
  end

  def self.down
    drop_table :id_gatekeeper_courses
  end
end
