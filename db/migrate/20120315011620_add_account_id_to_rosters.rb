class AddAccountIdToRosters < ActiveRecord::Migration
  def self.up
    add_column :rosters, :account_id, :integer, :limit => 8
  end

  def self.down
    remove_column :rosters, :account_id
  end
end
