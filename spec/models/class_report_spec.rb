require 'spec_helper'

describe ClassReport do
  before(:each) do
    @valid_attributes = {
      :course_id => 1,
      :quiz_id => 1,
      :q => "value for q",
      :number_correct => "value for number_correct",
      :number_attempted => "value for number_attempted",
      :percent_correct => "value for percent_correct",
      :item_analysis => "value for item_analysis",
      :teacher_id => 1,
      :teacher_name => "value for teacher_name",
      :course_name => "value for course_name",
      :school_name => "value for school_name",
      :submitted_student_count => 1,
      :submissions => "value for submissions"
    }
  end

  it "should create a new instance given valid attributes" do
    ClassReport.create!(@valid_attributes)
  end
end
