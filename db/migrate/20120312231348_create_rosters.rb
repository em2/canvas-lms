class CreateRosters < ActiveRecord::Migration
	tag :predeploy
	
	def self.up
		create_table :rosters do |t|

		  t.timestamps
		end
	end

	def self.down
		drop_table :rosters
	end
end
