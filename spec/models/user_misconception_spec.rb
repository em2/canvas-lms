require 'spec_helper'

describe UserMisconception do
  before(:each) do
    @valid_attributes = {
      :user_id => 1,
      :quiz_misconception_id => 1,
      :confidence_level => 1,
      :error_tally => 1,
      :workflow_state => "available"
    }
  end

  it "should create a new instance given valid attributes" do
    UserMisconception.create!(@valid_attributes)
  end
end
