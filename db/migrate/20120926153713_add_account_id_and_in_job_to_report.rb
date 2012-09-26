class AddAccountIdAndInJobToReport < ActiveRecord::Migration
  tag :predeploy

  def self.up
  	add_column :reports, :account_id, :integer, :limit => 8
  	add_column :reports, :in_job, :boolean
  end

  def self.down
  	remove_column :reports, :in_job
  	remove_column :reports, :account_id
  end
end
