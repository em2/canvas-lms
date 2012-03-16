class AddAccountIdToClassrooms < ActiveRecord::Migration
  def self.up
    add_column :classrooms, :account_id, :integer, :limit => 8
  end

  def self.down
    remove_column :classrooms, :account_id
  end
end
