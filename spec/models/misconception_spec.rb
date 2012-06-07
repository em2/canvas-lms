require File.expand_path(File.dirname(__FILE__) + '/../spec_helper.rb')
require "ruby-debug"

describe Misconception do
  before(:each) do

    course_with_student(:active_all => true)
    quiz_model(:course => @course)

    @valid_attributes = {
      :quiz_id => @quiz.id,
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

  it "should belong to a quiz" do
    misconception = Misconception.create!(@valid_attributes)
    misconception.quiz_id.should == @quiz.id
  end

  describe 'pattern field' do
    it 'should update the json string when we call the setter' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      misconception = Misconception.create!(@valid_attributes)
      misconception.pattern = pattern_hash

      JSON.parse(misconception.pattern_json).should == pattern_hash
    end

    it 'should convert into a hash when we load it from the database' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      misconception = Misconception.create!(@valid_attributes)
      misconception.pattern_json = pattern_hash.to_json
      
      misconception.pattern.should == pattern_hash
    end

    it 'should update the pattern when pattern is updated' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      misconception = Misconception.create!(@valid_attributes)
      misconception.pattern = pattern_hash

      misconception.pattern.should == pattern_hash

      pattern_hash = {"3"=>["1"=>2, "3"=>4], "10"=>["52"=>27,"77"=>93]}
      misconception.pattern = pattern_hash

      misconception.pattern.should == pattern_hash
    end
  end

end
