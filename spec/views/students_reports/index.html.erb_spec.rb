require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')
require File.expand_path(File.dirname(__FILE__) + '/../views_helper')

describe "/students_reports/index" do
	it "should render" do
  # before(:each) do
  # 	@course = Course.find(params[:course_id])
  # 	course(:course_name => "bfcoder", :account => )
		# @context = @course
		# @quiz = Quiz.find(params[:quiz_id])
		# @misconceptions = @quiz.quiz_misconceptions
		# @high_probability_limits = @quiz.quiz_misconception_probability.high_probability if @quiz.quiz_misconception_probability
		# @somewhat_probability_limits = @quiz.quiz_misconception_probability.somewhat_probability if @quiz.quiz_misconception_probability
		# @high_probability = {}
		# @somewhat_probability = {}

		# @misconceptions.active.each_with_index do |misconception, index|
		# 	@high_probability["#{misconception.id}"] = []
		# 	@somewhat_probability["#{misconception.id}"] = []
		# 	misconception.user_misconceptions.active.each_with_index do |user, um_index|
		# 		if @high_probability_limits && user.probability > @high_probability_limits["#{user.quiz_misconception_id}"].to_f
		# 			@high_probability["#{misconception.id}"] << user.user_id
		# 		elsif @somewhat_probability_limits && user.probability > @somewhat_probability_limits["#{user.quiz_misconception_id}"].to_f
		# 			@somewhat_probability["#{misconception.id}"] << user.user_id
		# 		end
		# 	end
		# end

		# @class_report = ClassReport.find_by_course_id_and_quiz_id(@course.id, @quiz.id)
		# @user_difficulties = JSON.parse(@class_report.user_difficulties)

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
