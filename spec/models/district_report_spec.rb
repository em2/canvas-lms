require 'spec_helper'

describe DistrictReport do
  before(:each) do
    @valid_attributes = {
      :account_id => 1,
      :probe_id => 1,
      :quiz_question_count => 1,
      :report_name => "value for report_name",
      :participating_students_count => 1,
      :participating_class_count => 1,
      :course_ids => "value for course_ids",
      :teacher_name => "value for teacher_name",
      :submitted_students_count => "value for submitted_students_count",
      :item_analysis => "value for item_analysis",
      :district_name => "value for district_name",
      :analysis => "value for analysis"
    }
  end

  it "should create a new instance given valid attributes" do
    DistrictReport.create!(@valid_attributes)
  end
end
