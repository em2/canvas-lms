class IdGatekeepersController < ApplicationController
  def generate
    if (params[:id_gatekeeper][:instance] == "" ||  params[:id_gatekeeper][:stage] == nil)
      flash[:notice] = "Please complete the form."
      redirect_back_or_default(dashboard_url)
    else
      debugger
      @id_gatekeeper = IdGatekeeper.new
      @quiz = Course.find(params[:id_gatekeeper][:course]).quizzes.create
      @quiz.title = AssessmentQuestionBank.find(params[:id_gatekeeper][:probe]).title + params[:id_gatekeeper][:stage] + params[:id_gatekeeper][:instance] + Course.find(params[:id_gatekeeper][:course]).name
      @quiz.hide_results = "always"
      @quiz.show_correct_answers = false
      @quiz.workflow_state = "available"
      @quiz.save!
    end
  end
  
  def show
    
  end

end
