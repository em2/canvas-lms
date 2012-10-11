require 'spec_helper'

describe QuizMisconceptionProbability do
  before(:each) do
    @valid_attributes = {
      :quiz_id => 1,
      :high_probability => "value for high_probability",
      :somewhat_probability => "value for somewhat_probability"
    }
  end

  it "should create a new instance given valid attributes" do
    QuizMisconceptionProbability.create!(@valid_attributes)
  end
end
