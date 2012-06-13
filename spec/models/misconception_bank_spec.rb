require 'spec_helper'

describe MisconceptionBank do
  before(:each) do
    @valid_attributes = {
      :assessment_question_bank_id => 1
    }
  end

  it "should create a new instance given valid attributes" do
    MisconceptionBank.create!(@valid_attributes)
  end
end
