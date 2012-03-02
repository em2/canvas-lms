require 'spec_helper'

describe IdGatekeeperCourse do
  before(:each) do
    @valid_attributes = {
      :id_gatekeeper_id => 1,
      :course_id => 1
    }
  end

  it "should create a new instance given valid attributes" do
    IdGatekeeperCourse.create!(@valid_attributes)
  end
end
