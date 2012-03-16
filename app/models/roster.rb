class Roster < ActiveRecord::Base
  belongs_to :account
  has_one :classroom
end
