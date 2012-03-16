class Roster < ActiveRecord::Base
  has_many :classrooms
  has_one :account
end
