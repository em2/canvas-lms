require 'spec_helper'

describe QuizMisconceptionProbabity do
  before(:each) do
    @valid_attributes = {
      :high_probability => "value for high_probability",
      :somewhat_probability => "value for somewhat_probability"
    }
  end

  it "should create a new instance given valid attributes" do
    QuizMisconceptionProbabity.create!(@valid_attributes)
  end
end
