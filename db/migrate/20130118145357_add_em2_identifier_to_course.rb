class AddEm2IdentifierToCourse < ActiveRecord::Migration
  tag :predeploy

  def self.up
    add_column :courses, :em2_identifier, :string
  end

  def self.down
    remove_column :courses, :em2_identifier
  end
end
