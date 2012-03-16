class AddRosterIdToClassrooms < ActiveRecord::Migration
  def self.up
    add_column :classrooms, :roster_id, :integer, :limit => 8
  end

  def self.down
    remove_column :classrooms, :roster_id
  end
end
