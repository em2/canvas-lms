class AddWorkflowStateToRosters < ActiveRecord::Migration
  def self.up
  	add_column :rosters, :workflow_state, :string
  end

  def self.down
  	remove_column :rosters, :workflow_state
  end
end
