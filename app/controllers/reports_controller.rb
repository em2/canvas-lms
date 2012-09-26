class ReportsController < ApplicationController
	def index
		if is_authorized?(@current_user) # Make sure the user is authorized to do this

      add_crumb("Reports")

      if !@report = Report.find_by_account_id(@context.id)
        @report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end

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
      if !report = Report.find_by_account_id(@context.id)
        report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end
      puts "Attempting to calculate reports."
      if !report.in_job
        report.in_job = true
        report.save!
        Delayed::Job.enqueue(ReportCalculateJob.new(report, @context))
        flash[:notice] = "Attempting to calculate the reports..."
      else
        flash[:error] = "The report is already in the queue."
      end
      
      
      redirect_back_or_default(reports_path)
    else
      flash[:notice] = "Not Authorized."
      redirect_back_or_default(dashboard_url)
    end

  end
end
