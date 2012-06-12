require File.expand_path(File.dirname(__FILE__) + '/../spec_helper.rb')
require "ruby-debug"

describe Misconception do
  before(:each) do

    course_with_student(:active_all => true)
    quiz_model(:course => @course)

    @valid_attributes = {
      :quiz_id => @quiz.id,
      :name => "Ethical Hacker",
      :description => "bfcoder for the win",
      :explanation_url => "http://smashthestack.org/",
      :pattern_json => "{\"100\":[{\"77\":93,\"52\":27}],\"30\":[{\"1\":2,\"3\":4}]}"
    }

    @misconception = Misconception.create!(@valid_attributes)

  end

  it "should create a new instance given valid attributes" do
    Misconception.create!(@valid_attributes)
  end

  it "should belong to a quiz" do
    @misconception.quiz_id.should == @quiz.id
  end

  describe "name field" do
    it "should update the name" do
      @misconception.name = "Unethical Hacker"

      @misconception.name.should == "Unethical Hacker"
    end
  end

  describe "description field" do
    it "should allow description modification" do
      @misconception.description = "bfcoder was here"

      @misconception.description.should == "bfcoder was here"
    end
  end

  describe "explanation_url field" do
    it "should update the explanation_url when we call the setter" do
      @misconception.explanation = "http://smashthestack.org/index.php"

      @misconception.explanation.should == "http://smashthestack.org/index.php"
    end

    it "should update the explanation when the explanation is updated" do
      @misconception.explanation = "http://smashthestack.org/index.php"

      @misconception.explanation.should == "http://smashthestack.org/index.php"

      @misconception.explanation = "http://smashthestack.org/faq.php"

      @misconception.explanation.should == "http://smashthestack.org/faq.php"
    end

    it "should validate the url" do
      pending
      @misconception.explanation = "http://.google.com"
      @misconception.explanation.should_not == "http://.google.com"
    end
  end

  describe 'pattern field' do
    it 'should update the json string when we call the setter' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      @misconception.pattern = pattern_hash

      JSON.parse(@misconception.pattern_json).should == pattern_hash
    end

    it 'should convert into a hash when we load it from the database' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      @misconception.pattern_json = pattern_hash.to_json
      
      @misconception.pattern.should == pattern_hash
    end

    it 'should update the pattern when pattern is updated' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      @misconception.pattern = pattern_hash

      @misconception.pattern.should == pattern_hash

      pattern_hash = {"3"=>["1"=>2, "3"=>4], "10"=>["52"=>27,"77"=>93]}
      @misconception.pattern = pattern_hash

      @misconception.pattern.should == pattern_hash
    end
  end

  describe "position field" do
    it "should update the position" do
      @misconception.position = 2
      
      @misconception.position.should == 2
    end
  end






end