class AssessmentMisconceptionsController < ApplicationController
	before_filter :require_context
  add_crumb("Question Banks") { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_question_banks_url }

  def new
    if is_account_admin?
  		bank = AssessmentQuestionBank.find(params[:question_bank_id])
  		bank.assessment_misconceptions.create!(:assessment_question_bank_id => bank.id, :name => "Untitled", :explanation_url => "", :description => "", :pattern => {}, :workflow_state => "available")
    	
      redirect_to :back
    else
      flash[:error] = "Unauthorized"
      redirect_to :back
    end
  end

  def update
    @misconception = AssessmentMisconception.find(params[:id])
    if params[:quiz_misconception][:pattern]
      pattern = JSON.parse(params[:quiz_misconception][:pattern])
      if !validate_pattern(pattern)
        render :json => {:error => "Only one 1 or all zeros are allowed for each question."}, :status => :bad_request and return
      end
      question_bank = AssessmentQuestionBank.find(params[:question_bank_id])
      assessment_questions = question_bank.assessment_questions
      assessment_questions.each do |assessment_question|
        assessment_question[:question_data][:answers].each do |answer|
          if answer[:misconception_id].nil?
            answer[:misconception_id] = "{}"
          end
          a = JSON.parse(answer[:misconception_id])
          a[params[:id]] = pattern["#{assessment_question[:id]}"]["#{answer[:id]}"]
          answer[:misconception_id] = a.to_json
        end
        assessment_question.save!
      end
      params[:quiz_misconception][:pattern] = pattern
    end
    if @misconception.update_attributes(params[:quiz_misconception]) && is_account_admin?
      @misconception.reload
      render :json => @misconception.to_json
    else
      render :json => @misconception.errors.to_json, :status => :bad_request
    end
  end

  def index
    if is_account_admin?
    	@bank = AssessmentQuestionBank.find(params[:question_bank_id])
      add_crumb(@bank.title)
      #add_crumb(@bank.id, url_for(@bank))
      add_crumb("Misconceptions")

    	@misconceptions = @bank.assessment_misconceptions
      if !@assessment_probabilities = @bank.assessment_misconception_probability
        @assessment_probabilities = @bank.build_assessment_misconception_probability
        @assessment_probabilities.save!
      end
    else
      flash[:error] = "Unauthorized"
      redirect_back_or_default(dashboard_url) and return
    end
  end

  def destroy
    if is_account_admin?
      @misconception = AssessmentMisconception.find(params[:id])
      @misconception.workflow_state = "deleted"
      @misconception.save!
      render :json => @misconception.to_json
    end
  end

end
