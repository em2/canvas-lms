require 'spec_helper'

describe AssessmentMisconception do
  before(:each) do

  end



  before(:each) do
    @context = course
    @bank = @course.assessment_question_banks.create!(:title=>'Test Bank')
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question', 'answers' => [{'id' => 1}, {'id' => 2}]})
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question 2', 'answers' => [{'id' => 3}, {'id' => 4}]})
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question 3', 'answers' => [{'id' => 3}, {'id' => 4}]})
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question 4', 'answers' => [{'id' => 3}, {'id' => 4}]})

    @valid_attributes = {
      :assessment_question_bank_id => @bank.id,
      :name => "Untitled",
      :description => "value for description",
      :explanation_url => "value for explanation_url",
      :pattern => "",
      :position => 1,
      :context_id => 1,
      :context_type => "value for context_type",
      :workflow_state => "available"
    }
    @misconception = AssessmentMisconception.new
  end

  it "should create a new instance given valid attributes" do
    AssessmentMisconception.create!(@valid_attributes)
  end

  describe "quiz_id field" do
    it "should store the id of the assessment question bank" do
      @misconception.assessment_question_bank_id.should be_nil
      @misconception.assessment_question_bank_id = @bank.id
      @misconception.assessment_question_bank_id.should == @bank.id
    end

    it "should save the assessment question bank" do
      @misconception.assessment_question_bank = @bank
      @misconception.assessment_question_bank_id.should == @bank.id
    end
  end

  describe "context access" do
    it "should save to the current context" do
      pending 
      @misconception.context << @context
      @misconception.context_id.should == @context.id
    end
  end

  describe "name field" do
    it "should update the name" do
      @misconception.name = "Subtracting Fractions"
      @misconception.name.should == "Subtracting Fractions"
    end
  end

  describe "pattern field" do
    it 'should update the pattern string when we call the setter' do
      pattern_hash = {"30"=>["1"=>2, "3"=>4], "100"=>["52"=>27,"77"=>93]}
      @misconception.pattern = pattern_hash
      
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

end
