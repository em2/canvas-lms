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
