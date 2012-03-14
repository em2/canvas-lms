class AddRosterIdToAccounts < ActiveRecord::Migration
  def self.up
    add_column :accounts, :roster_id, :integer, :limit => 8
  end

  def self.down
    remove_column :accounts, :roster_id
  end
end
