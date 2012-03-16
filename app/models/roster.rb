class Roster < ActiveRecord::Base
  has_many :accounts
  has_many :classrooms
end
