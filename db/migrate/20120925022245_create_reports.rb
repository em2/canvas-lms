class CreateReports < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :reports do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :reports
  end
end