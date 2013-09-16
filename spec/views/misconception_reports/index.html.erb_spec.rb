require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')
require File.expand_path(File.dirname(__FILE__) + '/../views_helper')

describe "/misconception_reports/index" do
  it "should render" do
    district_account = Account.default.sub_accounts.create!(:name => 'D001')
    school_account = district_account.sub_accounts.create!(:name => 'S001')
    course_with_teacher_logged_in(:active_all => true, :account => school_account)
    view_context

    assigns[:quizzes] = [@course.quizzes.create!]
    assigns[:course] = @course
    fill_quiz_and_misconceptions
    assigns[:quiz] = @quiz
    assigns[:unpublished_quizzes] = []
    assigns[:assignment_quizzes] = assigns[:quizzes]
    assigns[:open_quizzes] = assigns[:quizzes]
    assigns[:surveys] = assigns[:quizzes]
    assigns[:submissions_hash] = {}
    assigns[:misconceptions] = @quiz.quiz_misconceptions
    assigns[:submissions] = @submissions
    assigns[:high_probability] = @high_probability
    assigns[:somewhat_probability] = @somewhat_probability
    assigns[:user_difficulties] = @user_difficulties
    render 'misconception_reports/index'
    response.should_not be_nil
  end
end
