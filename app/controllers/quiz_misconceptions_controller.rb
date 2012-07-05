class QuizMisconceptionsController < ApplicationController
	before_filter :require_context
  add_crumb("Quizzes") { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_quizzes_url }

  def new
		quiz = Quiz.find(params[:quiz_id])
		quiz.quiz_misconceptions.create!(:quiz_id => quiz.id, :name => "Untitled", :explanation_url => "", :description => "", :pattern => {}, :workflow_state => "available")
  	
    redirect_to :back
  end

  def update
    @misconception = QuizMisconception.find(params[:id])
    if @misconception.update_attributes(params[:assessment_misconception])
      @misconception.reload
      render :json => @misconception.to_json
    else
      render :json => @misconception.errors.to_json, :status => :bad_request
    end
  end

  def index
    @abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    
  	@quiz = Quiz.find(params[:quiz_id])
    add_crumb(@quiz.title)
    #add_crumb(@quiz.id, url_for(@quiz))
    add_crumb("Misconceptions")
  	@misconceptions = @quiz.quiz_misconceptions

  end

  def destroy
    @misconception = QuizMisconception.find(params[:id])
    @misconception.workflow_state = "deleted"
    @misconception.save!
    render :json => @misconception.to_json
  end

end
