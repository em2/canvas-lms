class IdGatekeeper < ActiveRecord::Base
  attr_accessible :assessment_name, :stage, :instance
  
  validates_presence_of :assessment_name
  validates_presence_of :stage
  validates_presence_of :instance
  
  has_many :users
  belongs_to :assessment_question_bank
  belongs_to :course
  belongs_to :quiz
  
end
