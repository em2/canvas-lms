class QuizMisconceptionsController < ApplicationController
  before_filter :require_user
	before_filter :require_context
  #add_crumb("Quizzes") { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_quizzes_url }
  add_crumb(proc { t(:top_level_crumb, "Quizzes") }) { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_quizzes_url }
  def new
    if authorized_action(@context, @current_user, :read) && is_account_admin?
  		quiz = Quiz.find(params[:quiz_id])
  		quiz.quiz_misconceptions.create!(:quiz_id => quiz.id, :name => "Untitled", :explanation_url => "", :description => "", :pattern => {}, :workflow_state => "available")
    	
      redirect_to :back
    else
      flash[:error] = "Unathorized"
      redirect_to :back
    end
  end

  def update
    if authorized_action(@context, @current_user, :read)
      @misconception = QuizMisconception.find(params[:id])
      if params[:quiz_misconception][:pattern]
        pattern = JSON.parse(params[:quiz_misconception][:pattern])
        if !validate_pattern(pattern)
          render :json => {:error => "Only one 1 or all zeros are allowed for each question."}, :status => :bad_request and return
        end
        quiz = Quiz.find(params[:quiz_id])
        quiz_data = quiz.quiz_data
        quiz_data.each do |qd|
          qd[:answers].each do |qa|
            a = JSON.parse(qa[:misconception_id])
            a[params[:id]] = pattern["#{qd[:id]}"]["#{qa[:id]}"]
            qa[:misconception_id] = a.to_json
          end
          quiz_question = QuizQuestion.find(qd[:id])
          quiz_question[:question_data][:answers].each do |qa|
            a = JSON.parse(qa[:misconception_id])
            a[params[:id]] = pattern["#{qd[:id]}"]["#{qa[:id]}"]
            qa[:misconception_id] = a.to_json
          end
          quiz_question.save!
        end
        params[:quiz_misconception][:pattern] = pattern

        quiz.generate_quiz_data
        quiz.published_at = Time.now
        quiz.workflow_state = 'available'
        quiz.save!
      end
      if @misconception.update_attributes(params[:quiz_misconception]) && is_account_admin?
        @misconception.reload
        render :json => @misconception.to_json
      else
        render :json => @misconception.errors.to_json, :status => :bad_request
      end
    end
  end

  def index
    if authorized_action(@context, @current_user, :read)
      if is_account_admin?
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
      else
        flash[:error] = "Unauthorized"
        redirect_back_or_default(dashboard_url) and return
      end
    end
  end

  def destroy
    if authorized_action(@context, @current_user, :read) && is_account_admin?
      @misconception = QuizMisconception.find(params[:id])
      @misconception.workflow_state = "deleted"
      @misconception.save!
      render :json => @misconception.to_json
    end
  end

end
