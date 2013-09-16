class StudentsReportsController < ApplicationController
	before_filter :require_context
	before_filter :require_user

  def index
		if authorized_action(@context, @current_user, :read) && redirect_if_not_admin_or_teacher

			@course = Course.find(params[:course_id])
			@quiz = Quiz.find(params[:quiz_id])
			@context = @course

			add_crumb(t('#crumbs.assessments', "Assessments"), named_context_url(@context, :context_quizzes_url))
			add_crumb(@quiz.title, named_context_url(@context, :context_quiz_url, @quiz))
			add_crumb(t('#crumbs.students_reports', 'Misconception Reports'), named_context_url(@context, :context_quiz_students_reports_url, @quiz))

			@misconceptions = @quiz.quiz_misconceptions
			@high_probability_limits = @quiz.quiz_misconception_probability.high_probability if @quiz.quiz_misconception_probability
			@somewhat_probability_limits = @quiz.quiz_misconception_probability.somewhat_probability if @quiz.quiz_misconception_probability
			@high_probability = {}
			@somewhat_probability = {}

			@misconceptions.active.each_with_index do |misconception, index|
				@high_probability["#{misconception.id}"] = []
				@somewhat_probability["#{misconception.id}"] = []
				misconception.user_misconceptions.active.each_with_index do |user, um_index|
					if @high_probability_limits && user.probability > @high_probability_limits["#{user.quiz_misconception_id}"].to_f
						@high_probability["#{misconception.id}"] << user.user_id
					elsif @somewhat_probability_limits && user.probability > @somewhat_probability_limits["#{user.quiz_misconception_id}"].to_f
						@somewhat_probability["#{misconception.id}"] << user.user_id
					end
				end
			end

			if @class_report = ClassReport.find_by_course_id_and_quiz_id(@course.id, @quiz.id)
				@submissions = JSON.parse(@class_report.submissions)
				@user_difficulties = JSON.parse(@class_report.user_difficulties)
			else
				flash[:error]="This report is not yet ready. Please try back later."
				redirect_to course_quiz_path(params[:course_id], params[:quiz_id])
			end

		end

  end

end
