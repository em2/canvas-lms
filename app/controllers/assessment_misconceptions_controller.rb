class AssessmentMisconceptionsController < ApplicationController
	before_filter :require_context
  add_crumb("Question Banks") { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_question_banks_url }

  def new
		bank = AssessmentQuestionBank.find(params[:question_bank_id])
		bank.assessment_misconceptions.create!(:assessment_question_bank_id => bank.id, :name => "Untitled", :explanation_url => "", :description => "", :pattern => {}, :workflow_state => "available")
  	
    redirect_to :back
  end

  def update
    @misconception = AssessmentMisconception.find(params[:id])
    if @misconception.update_attributes(params[:assessment_misconception])
      @misconception.reload
      render :json => @misconception.to_json
    else
      render :json => @misconception.errors.to_json, :status => :bad_request
    end
  end

  def index
    @abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    
  	@bank = AssessmentQuestionBank.find(params[:question_bank_id])
    add_crumb(@bank.title)
    #add_crumb(@bank.id, url_for(@bank))
    add_crumb("Misconceptions")
  	@misconceptions = @bank.assessment_misconceptions

  end

  def destroy
    @misconception = AssessmentMisconception.find(params[:id])
    @misconception.workflow_state = "deleted"
    @misconception.save!
    render :json => @misconception.to_json
  end

end
