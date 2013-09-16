require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe MisconceptionReportsController do

  describe "GET 'index'" do
    it "should be successful" do
      district_account = Account.default.sub_accounts.create!(:name => 'D001')
      school_account = district_account.sub_accounts.create!(:name => 'S001')
      course_with_teacher_logged_in(:active_all => true, :account => school_account)
      @course.quizzes.create!
      fill_quiz_and_misconceptions
      get 'index', :course_id => 1, :quiz_id => 1
      response.should be_success
    end
  end

end
