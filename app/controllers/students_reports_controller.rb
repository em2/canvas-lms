class StudentsReportsController < ApplicationController
  def index
		if is_authorized?(@current_user)
			@course = Course.find(params[:course_id])
			@context = @course
			@quiz = Quiz.find(params[:quiz_id])
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

			@class_report = ClassReport.find_by_course_id_and_quiz_id(@course.id, @quiz.id)
			@user_difficulties = JSON.parse(@class_report.user_difficulties)

		end

  end

  def show
  end

end
