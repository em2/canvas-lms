require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')
require File.expand_path(File.dirname(__FILE__) + '/../views_helper')

describe "/students_reports/index" do
	it "should render" do
		course_with_student
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
    render 'students_reports/index'
    response.should_not be_nil
  end
end
