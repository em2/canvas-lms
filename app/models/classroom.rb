class Classroom < ActiveRecord::Base
  belongs_to :roster
  has_many :accounts
end
