class AddIdGatekeeperIdToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :id_gatekeeper_id, :integer, :limit => 8
  end

  def self.down
    remove_column :users, :id_gatekeeper_id
  end
end
