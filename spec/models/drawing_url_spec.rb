require 'spec_helper'

describe DrawingUrl do
  before(:each) do
    @valid_attributes = {
      :quiz_submission_id => 1,
      :quiz_id => 1,
      :user_id => 1,
      :question_id => 1,
      :url => "value for url"
    }
  end

  it "should create a new instance given valid attributes" do
    DrawingUrl.create!(@valid_attributes)
  end
end
