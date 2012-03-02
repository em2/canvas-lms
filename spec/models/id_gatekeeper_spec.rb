require 'spec_helper'

describe IdGatekeeper do
  before(:each) do
    @valid_attributes = {
      :assessment_id => "value for assessment_id",
      :user_name => "value for user_name",
      :stage => "value for stage",
      :instance => 1
    }
  end

  it "should create a new instance given valid attributes" do
    IdGatekeeper.create!(@valid_attributes)
  end
  
  it "should require an assessment_id" do
    no_assessment_id = IdGatekeeper.new(@valid_attributes.merge(:assessment_id => ""))
    no_assessment_id.should_not be_valid
  end
  
  it "should require a user_name" do
    no_user_name = IdGatekeeper.new(@valid_attributes.merge(:user_name => ""))
    no_user_name.should_not be_valid
  end
  
  it "should require a stage" do
    no_stage = IdGatekeeper.new(@valid_attributes.merge(:stage => ""))
    no_stage.should_not be_valid
  end
  
  it "should require an instance" do
    no_instance = IdGatekeeper.new(@valid_attributes.merge(:instance => nil))
    no_instance.should_not be_valid
  end
end
