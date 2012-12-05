class StudentsReportsController < ApplicationController
  def index
  	@course = Course.find(params[:course_id])
  	@quiz = Quiz.find(params[:quiz_id])
  	@misconceptions = @quiz.quiz_misconceptions
  	@high_probability = @quiz.quiz_misconception_probability.high_probability
    @somewhat_probability = @quiz.quiz_misconception_probability.somewhat_probability
  end

  def show
  end

end
