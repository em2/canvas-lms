class QuizMisconceptionsController < ApplicationController
  before_filter :require_user
	before_filter :require_context
  #add_crumb("Quizzes") { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_quizzes_url }
  add_crumb(proc { t(:top_level_crumb, "Quizzes") }) { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_quizzes_url }
  def new
    if authorized_action(@context, @current_user, :read)
  		quiz = Quiz.find(params[:quiz_id])
  		quiz.quiz_misconceptions.create!(:quiz_id => quiz.id, :name => "Untitled", :explanation_url => "", :description => "", :pattern => {}, :workflow_state => "available")
    	
      redirect_to :back
    end
  end

  def update
    if authorized_action(@context, @current_user, :read)
      @misconception = QuizMisconception.find(params[:id])
      if @misconception.update_attributes(params[:quiz_misconception])
        @misconception.reload
        render :json => @misconception.to_json
      else
        render :json => @misconception.errors.to_json, :status => :bad_request
      end
    end
  end

  def index
    if authorized_action(@context, @current_user, :read)
    	@quiz = Quiz.find(params[:quiz_id])
      add_crumb(@quiz.title, named_context_url(@context, :context_quiz_url, @quiz))
      #add_crumb(@quiz.id, url_for(@quiz))
      add_crumb("Misconceptions")
      @active_tab = "quizzes"

    	@misconceptions = @quiz.quiz_misconceptions
      if !@quiz_probabilities = @quiz.quiz_misconception_probability
        @quiz_probabilities = @quiz.build_quiz_misconception_probability
        @quiz_probabilities.save!
      end
    end
  end

  def destroy
    if authorized_action(@context, @current_user, :read)
      @misconception = QuizMisconception.find(params[:id])
      @misconception.workflow_state = "deleted"
      @misconception.save!
      render :json => @misconception.to_json
    end
  end

end
