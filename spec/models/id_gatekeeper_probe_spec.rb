require 'spec_helper'

describe IdGatekeeperProbe do
  before(:each) do
    @valid_attributes = {
      :id_gatekeeper_id => 1,
      :probe_id => 1
    }
  end

  it "should create a new instance given valid attributes" do
    IdGatekeeperProbe.create!(@valid_attributes)
  end
end
