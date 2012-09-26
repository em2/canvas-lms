class AddCalculationCountToReport < ActiveRecord::Migration
  tag :predeploy

  def self.up
  	add_column :reports, :calculation_count, :integer
  end

  def self.down
  	remove_column :reports, :calculation_count
  end
end
