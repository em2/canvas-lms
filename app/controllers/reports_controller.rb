class ReportsController < ApplicationController
	def index
		if is_authorized?(@current_user) # Make sure the user is authorized to do this

      add_crumb("Reports")

      @question_bank = AssessmentQuestionBank.active
      
    else
      redirect_back_or_default(dashboard_url)
    end
	end
	def show
    if is_authorized?(@current_user) # Make sure the user is authorized to do this
      @current_probe = AssessmentQuestionBank.find(params[:id])
      
      add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title)

      is_admin?
      is_teacher?

    else
      redirect_back_or_default(dashboard_url)
    end
	end

  def calculate_reports
    if is_authorized?(@current_user) # Make sure the user is authorized to do this
      Report.calculate_them
      
      flash[:notice] = "Attempting to calculate the reports..."
      redirect_back_or_default(reports_path)
    else
      flash[:notice] = "Not Authorized."
      redirect_back_or_default(dashboard_url)
    end

  end
end
