class CreateIdGatekeepers < ActiveRecord::Migration
  def self.up
    create_table :id_gatekeepers do |t|
      t.string :assessment_id
      t.string :user_name
      t.string :stage
      t.integer :instance

      t.timestamps
    end
  end

  def self.down
    drop_table :id_gatekeepers
  end
end
