require 'spec_helper'

describe AssessmentMisconceptionProbability do
  before(:each) do
    @valid_attributes = {
      :assessment_question_bank_id => 1,
      :high_probability => "value for high_probability",
      :somewhat_probability => "value for somewhat_probability"
    }
  end

  it "should create a new instance given valid attributes" do
    AssessmentMisconceptionProbability.create!(@valid_attributes)
  end
end
