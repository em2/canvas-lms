class AddClassroomIdToAccounts < ActiveRecord::Migration
  def self.up
    add_column :accounts, :classroom_id, :integer, :limit => 8
  end

  def self.down
    remove_column :accounts, :classroom_id
  end
end
