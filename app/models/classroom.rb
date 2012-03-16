class Classroom < ActiveRecord::Base
  belongs_to :roster
  belongs_to :course
  belongs_to :account
end
