class AddPermanentNameIdentifierToUsers < ActiveRecord::Migration
  tag :postdeploy

  def self.up
  	add_column :users, :permanent_name_identifier, :string
  	users = User.all
  	users.each do |user|
  		if (user.sortable_name)
	  		user.permanent_name_identifier = user.sortable_name
	  		user.save!
	  	end
  	end
  end

  def self.down
  	remove_column :users, :permanent_name_identifier
  end
end
