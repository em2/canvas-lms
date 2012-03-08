require 'spec_helper'

describe Assessment do
  before(:each) do
    @valid_attributes = {
      :assessment_name => "value for assessment_name",
      :course_name_short => "value for course_name_short",
      :stage => "value for stage",
      :instance => "value for instance",
      :quiz_id => 1,
      :course_id => 1,
      :assessment_question_bank_id => 1
    }
  end

  it "should create a new instance given valid attributes" do
    Assessment.create!(@valid_attributes)
  end
end
