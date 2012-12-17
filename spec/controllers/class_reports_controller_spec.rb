require 'spec_helper'

describe ClassReportsController do
  it "should be successful" do
    pending "learn how to write a simple spec..."
    district_account = Account.default.sub_accounts.create!(:name => 'D001')
    school_account = district_account.sub_accounts.create!(:name => 'S001')
    course_with_teacher_logged_in(:active_all => true, :account => school_account)
    @course.quizzes.create!
    fill_quiz_and_misconceptions

    controller.instance_variable_set(:@context, @report)
    # @tess = mock_model(ClassReport)
    # controller.stub(:tester).and_return("bfcoder")

    get 'index'
    response.should be_success
  end
end
