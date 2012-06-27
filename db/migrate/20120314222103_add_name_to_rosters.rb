class AddNameToRosters < ActiveRecord::Migration
	tag :predeploy
	
	def self.up
		add_column :rosters, :name, :string
	end

	def self.down
		remove_column :rosters, :name
	end
end
