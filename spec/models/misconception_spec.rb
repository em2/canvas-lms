require 'spec_helper'

describe Misconception do
  before(:each) do
    @valid_attributes = {
      :quiz_id => 1,
      :name => "value for name",
      :description => "value for description",
      :explanation_url => "value for explanation_url",
      :pattern_json => "value for pattern_json",
      :sort => 1
    }
  end

  it "should create a new instance given valid attributes" do
    Misconception.create!(@valid_attributes)
  end
end
