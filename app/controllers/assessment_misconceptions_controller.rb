class AssessmentMisconceptionsController < ApplicationController
	before_filter :require_context

  def new
  	debugger
		bank = AssessmentQuestionBank.find(params[:question_bank_id])
		bank.assessment_misconceptions.create!(:assessment_question_bank_id => bank.id, :name => "Untitled", :pattern => {}, :workflow_state => "available")
  	
    redirect_to :back
  end

  def show
  end

  def update
    # @misconception = Misconception.find(params[:id])
    # if @misconception.update_attributes(params[:quiz_misconception])
    #   @misconception.reload
    #   render :json => @misconception.to_json
    # else
    #   render :json => @misconception.errors.to_json, :status => :bad_request
    # end
  end

  def index
    @abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    
  	add_crumb("Misconceptions")
  	@bank = AssessmentQuestionBank.find(params[:question_bank_id])
  	@misconceptions = @bank.assessment_misconceptions

  end

  def destroy
    #@misconception = Misconception.find(params[:id])
    #@misconception.destroy
    #render :json => @misconception.to_json
  end

end
