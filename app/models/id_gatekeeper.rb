class IdGatekeeper < ActiveRecord::Base
  attr_accessible :assessment_id, :user_name, :stage, :instance
  validates_presence_of :assessment_id
  validates_uniqueness_of :assessment_id
  validates_presence_of :user_name
  validates_presence_of :stage
  validates_presence_of :instance
  
  has_many :users
  has_many :assessment_question_banks, :through => :id_gatekeeper_probes
  has_many :courses, :through => :id_gatekeeper_courses
  
end
