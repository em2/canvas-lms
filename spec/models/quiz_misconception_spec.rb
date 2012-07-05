require 'spec_helper'

describe QuizMisconception do
  before(:each) do
    course
    @bank = @course.assessment_question_banks.create!(:title=>'Test Bank')
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question', 'answers' => [{'id' => 1}, {'id' => 2}]})
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question 2', 'answers' => [{'id' => 3}, {'id' => 4}]})
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question 3', 'answers' => [{'id' => 3}, {'id' => 4}]})
    @bank.assessment_questions.create!(:question_data => {'name' => 'test question 4', 'answers' => [{'id' => 3}, {'id' => 4}]})
    @quiz = @course.quizzes.create!(:title => "some quiz")
    @group = @quiz.quiz_groups.create!(:name => "question group", :pick_count => 3, :question_points => 5.0)
    @group.assessment_question_bank = @bank
    @group.save

    @valid_attributes = {
      :quiz_id => @quiz.id,
      :name => "value for name",
      :description => "value for description",
      :explanation_url => "www.bfcoder.com",
      :pattern => "",
      :position => 1,
      :workflow_state => "available",
      :assessment_misconception_id => 1,
      :assessment_misconception_version => 1,
      :quiz_group_id => 1
    }
    @misconception = QuizMisconception.new
  end

  it "should create a new instance given valid attributes" do
    QuizMisconception.create!(@valid_attributes)
  end

  describe "quiz_id field" do
    it "should store the id of the quiz" do
      @misconception.quiz_id.should be_nil
      @misconception.quiz_id = @quiz.id
      @misconception.quiz_id.should == @quiz.id
    end

    it "should save the quiz" do
      @misconception.quiz = @quiz
      @misconception.quiz_id.should == @quiz.id
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

  describe "assessment misconception id field" do
    before(:each) do
      @assessment_misconception = AssessmentMisconception.new
    end
    it "should store the id of the assessment misconception" do
      @misconception.assessment_misconception_id.should be_nil
      @misconception.assessment_misconception_id = @assessment_misconception.id
      @misconception.assessment_misconception_id.should == @assessment_misconception.id
    end

    it "should save the assessment misconception" do
      @misconception.assessment_misconception = @assessment_misconception
      @misconception.assessment_misconception_id.should == @assessment_misconception.id
    end
  end
end
