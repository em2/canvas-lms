class DropConfidenceLevelAndErrorTallyAndAddProbabilityToUserMisconceptions < ActiveRecord::Migration
  tag :predeploy

  def self.up
  	remove_column :user_misconceptions, :confidence_level
  	remove_column :user_misconceptions, :error_tally
  	add_column :user_misconceptions, :probability, :float
  end

  def self.down
  	remove_column :user_misconceptions, :probability
  	add_column :user_misconceptions, :error_tally, :integer
  	add_column :user_misconceptions, :confidence_level, :integer
  end
end
