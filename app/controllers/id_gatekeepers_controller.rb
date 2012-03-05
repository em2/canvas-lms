class IdGatekeepersController < ApplicationController
  def generate
    if (params[:id_gatekeeper][:instance] == "" ||  params[:id_gatekeeper][:stage] == nil)
      flash[:notice] = "Please complete the form."
      redirect_back_or_default(dashboard_url)
    else
#      @id_gatekeeper = IdGatekeeper.new
      @quiz = Course.find(params[:id_gatekeeper][:course]).quizzes.create
      @quiz.title = AssessmentQuestionBank.find(params[:id_gatekeeper][:probe]).title + params[:id_gatekeeper][:stage] + params[:id_gatekeeper][:instance] + Course.find(params[:id_gatekeeper][:course]).name
      @quiz.description = nil
      @quiz.hide_results = 'always'
      @quiz.show_correct_answers = false
      @quiz.content_being_saved_by(@current_user)
      @quiz.infer_times()
      @quiz.add_assessment_questions(AssessmentQuestionBank.find(params[:id_gatekeeper][:probe]).assessment_questions)
      @quiz.generate_quiz_data()
      @quiz.published_at = Time.now
      @quiz.workflow_state = 'available'
      @quiz.last_assignment_id = @quiz.assignment_id
      @quiz.anonymous_submissions = false
#      @quiz.id_gatekeeper_id = @id_gatekeeper.id
      @quiz.save!
    end
  end
  
  def show
    
  end

end
